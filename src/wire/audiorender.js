import { subbuffer, mix, join, silence } from './../lib/soundlab';
import { audioContext } from './audiosource';
import {
    sum as sumTime,
    lt,
    gt,
    subtract as subtractTime,
} from './../util/time';
import { clamp, AudioRange } from './../util/audiorange';

/*
 *
 *
 * Renders audio data from an audio source to a segment
 * Property offsets underlying audio based on cursor position
 *
 */
function renderSegment(segment, audioSource, startTime /* global start */, duration /* global duration */) {
    const {
        sourceOffset,
        duration: segmentDuration,
        offset,
    } = segment;

    const range = clamp(
        new AudioRange(startTime, duration),
        new AudioRange(offset, segmentDuration)
    );

    const diff = subtractTime(range.start, offset);
    return {
        audio: subbuffer(
            audioSource.audio,
            sumTime(diff, sourceOffset).milliseconds,
            segmentDuration.milliseconds,
        ),
        offset,
        duration: segmentDuration,
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
        const previous = renderedSegments[index - 1];
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

export function segmentInTimeRange(segment, startTime, duration) {
    const segmentEnd = sumTime(segment.offset, segment.duration);
    const end = sumTime(startTime, duration);
    return (
        (
            gt(segment.offset, startTime) &&
            lt(segment.offset, end)
        ) ||
        (
            lt(segmentEnd, end) &&
            gt(segmentEnd, startTime)
        ) ||
        (
            lt(segment.offset, startTime) &&
            gt(segmentEnd, startTime)
        )
    )
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

export function renderAudioBuffer(start, duration, audioTracks, audioSources) {
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
