import { audioContext } from './audiosource';
import { register } from 'wire-service';
import { subbuffer, mix, join, silence } from './../lib/soundlab';
import { BehaviorSubject } from 'rxjs';
import { Record } from 'immutable';
import { Time } from './../util/time';
import { wireObservable } from './../util/wire-observable';

class Playhead extends Record({
    playbackTime: null
}) {

}
const playheadSubject = new BehaviorSubject(new Playhead());

class PlaybackController {
    constructor(audioContext, audioBuffer, start) {
        this.audioContext = audioContext;
        this.audioBuffer = audioBuffer;
        this.startTime = start;

        this.startAudioContextTime = null;
    }

    raf = null;
    updateTime = () => {
        const currentTime = Time.fromSeconds(this.audioContext.currentTime);
        const diffMilliseconds = currentTime.milliseconds - this.startAudioContextTime.milliseconds;
        const nextTime = new Time(this.startTime.milliseconds + diffMilliseconds);
        playheadSubject.next(
            playheadSubject.value.set('playbackTime', nextTime)
        );
        this.raf = requestAnimationFrame(this.updateTime);
    }

    start() {
        const { audioBuffer, audioContext } = this;
        this.startAudioContextTime = Time.fromSeconds(audioContext.currentTime);
        return new Promise((res) => {
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);


            source.addEventListener('ended', () => {
                cancelAnimationFrame(this.raf);
                res();
            }, { once: true });
            source.start();
            this.updateTime();
        });
    }
}

/*
 *
 *
 * Renders audio data from an audio source to a segment
 * Property offsets underlying audio based on cursor position
 *
 */
function renderSegment(segment, audioSource, startTime /* global start */, duration /* global duration */) {
    const {
        milliseconds: cursorMilliseconds,
    } = startTime;
    const {
        sourceOffset,
        duration: segmentDuration,
        offset,
    } = segment;
    const {
        milliseconds: offsetMilliseconds,
    } = offset;

    const {
        milliseconds: segmentDurationMilliseconds,
    } = segmentDuration;

    const playbackEndMs = duration.milliseconds + startTime.milliseconds;

    const segmentEndMilliseconds = offsetMilliseconds + segmentDurationMilliseconds;

    const cursorDiff = offsetMilliseconds > cursorMilliseconds ? 0 : cursorMilliseconds - offsetMilliseconds;
    const durationDiff = segmentEndMilliseconds < playbackEndMs ? 0 : segmentEndMilliseconds - playbackEndMs;

    return {
        audio: subbuffer(
            audioSource.audio,
            sourceOffset.milliseconds + cursorDiff,
            (segmentDuration.milliseconds - durationDiff) - cursorDiff,
        ),
        offset,
        segmentDuration,
    };
}

/*
 *
 * Adds silent audio buffers between rendered segments
 *
 */
function fillRenderedSegments(renderedSegments, startTime) {
    const {
        milliseconds: cursorMilliseconds,
    } = startTime;

    return renderedSegments.reduce((seed, renderedSegment, index) => {
        const previous = seed[index - 1];
        const previousEndMs = index === 0 ? cursorMilliseconds : previous.offset.milliseconds + previous.duration.milliseconds;
        const startMs = renderedSegment.offset.milliseconds;
        const diff = startMs - previousEndMs;
        if (diff > 0) {
            seed.push(
                silence(
                    renderedSegment.audio.sampleRate,
                    renderedSegment.audio.numberOfChannels,
                    diff
                )
            );
        }

        seed.push(renderedSegment.audio);
        return seed;
    }, []);
}

function segmentInTimeRange(segment, startTime, duration) {
    const {
        milliseconds: cursorMilliseconds,
    } = startTime;

    const {
        milliseconds: playbackDurationMilliseconds,
    } = duration;

    const playbackEndMilliseconds = cursorMilliseconds + playbackDurationMilliseconds;
    const startMilliseconds = segment.offset.milliseconds;
    const endMilliseconds = startMilliseconds + segment.duration.milliseconds;
    return (
        (
            cursorMilliseconds >= startMilliseconds &&
            cursorMilliseconds < endMilliseconds
        ) ||
        (
            playbackEndMilliseconds >= startMilliseconds &&
            playbackEndMilliseconds < endMilliseconds
        )
    );
}

/*
 *
 *
 * Renders a track to a playable AudioBuffer
 *
 */
function renderTrackToAudioBuffer(audioTrack, audioSources, start, duration) {
    const filteredSegments = audioTrack.segments.toList().filter((segment) => {
        return segmentInTimeRange(
            segment,
            start,
            duration,
        );
    });

    if (filteredSegments.size === 0) {
        return null;
    }

    const renderedSegments = audioTrack.segments.toList().map((segment) => {
        const { sourceId } = segment;
        return renderSegment(
            segment,
            audioSources.get(sourceId),
            start,
            duration,
        );
    })
    .toArray();

    const filled = fillRenderedSegments(renderedSegments, start)

    return join(filled);
}

function getAudioBuffer(start, duration, audioTracks, audioSources) {
    let audioBuffers = audioTracks.map((audioTrack) => {
        return renderTrackToAudioBuffer(
            audioTrack,
            audioSources,
            start,
            duration,
        );
    })
    .filter((audioBuffer) => {
        return audioBuffer !== null;
    })
    .toList()
    .toJS();

    if (audioBuffers.length === 0) {
        audioBuffers = [
            silence(
                audioContext.sampleRate,
                2,
                duration.milliseconds,
            )
        ];
    }

    return mix(audioContext, audioBuffers);
}

const bufferDuration = Time.fromSeconds(1);

function playSegment(start, audioBuffer, audioTracks, audioSources) {
    const bufferDuration = Time.fromSeconds(audioBuffer.duration);
    const playbackController = new PlaybackController(
        audioContext,
        audioBuffer,
        start,
    );

    return playbackController.start().then(() => {
        const nextStart = new Time(start.milliseconds + bufferDuration.milliseconds);
        return getAudioBuffer(nextStart, bufferDuration, audioTracks, audioSources).then((nextBuffer) => {
            return playSegment(
                nextStart,
                nextBuffer,
                audioTracks,
                audioSources,
            );
        });
    })
}

export function play(start, duration, audioTracks, audioSources) {
    getAudioBuffer(start, bufferDuration, audioTracks, audioSources).then((buffer) => {
        return playSegment(
            start,
            buffer,
            audioTracks,
            audioSources,
        );
    });

}

export const playheadSym = Symbol();
register(playheadSym, wireObservable(playheadSubject.asObservable()));
