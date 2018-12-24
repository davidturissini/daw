import { Time } from './../util/time';
import { audioContext } from './audiosource';
import { subbuffer, mix, join, silence } from './../lib/soundlab';
import { List } from 'immutable';

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
            startMilliseconds >= cursorMilliseconds &&
            startMilliseconds < playbackEndMilliseconds
        ) ||
        (
            endMilliseconds <= playbackEndMilliseconds &&
            endMilliseconds >= cursorMilliseconds
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

    const renderedSegments = filteredSegments.map((segment) => {
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

export function play(start, duration, audioTracks, audioSources) {
    const audioBuffers = audioTracks.map((audioTrack) => {
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
    mix(audioBuffers).then((buffer) => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
    });

}
