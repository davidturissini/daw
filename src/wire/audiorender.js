import {
    Time,
    sum as sumTime,
    lt,
    gt,
} from './../util/time';
import { clamp } from './../util/audiorange';
import { silence as createSilence } from './../lib/soundlab';

export function createSilentRenderedAudioSegment(audioContext, playbackRange, duration) {
    const silence = createSilence(
        audioContext.sampleRate,
        1,
        duration.milliseconds
    );
    return new RenderedAudioSegment(
        audioContext,
        silence,
        playbackRange,
        new Time(0),
        playbackRange
    );
}

class RenderedAudioSegment {
    constructor(audioContext, audio, playbackRange, segmentSourceOffset, segmentRange) {
        this.playbackRange = playbackRange;
        this.segmentSourceOffset = segmentSourceOffset;
        this.segmentRange = segmentRange;

        const source = this.source = audioContext.createBufferSource();
        source.buffer = audio;
    }

    getPlaybackData(audioContextCurrentTime, currentTime) {
        const { playbackRange, segmentRange, segmentSourceOffset } = this;
        const clamped = clamp(playbackRange, segmentRange);
        let startOffset = segmentRange.start.subtract(currentTime);
        let offset = segmentSourceOffset;
        if (startOffset.milliseconds < 0) {
            offset = offset.subtract(startOffset);
            startOffset = new Time(0);
        }

        return {
            when: startOffset.add(audioContextCurrentTime).seconds,
            offset: offset.seconds,
            duration: clamped.duration.seconds,
        };
    }

    start(audioContextCurrentTime, currentTime) {
        if (!audioContextCurrentTime) {
            throw new Error(`Cannot start RenderedAudioSegment playback. "${audioContextCurrentTime}" not a valid AudioContext.currentTime value`);
        }
        if (!currentTime) {
            throw new Error(`Cannot start RenderedAudioSegment playback. "${currentTime}" not a valid Playhead.currentTime value`);
        }
        const { source } = this;
        const { when, offset, duration } = this.getPlaybackData(audioContextCurrentTime, currentTime);
        source.start(
            when,
            offset,
            duration,
        );

        return new Promise((res) => {
            source.addEventListener('ended', res, { once: true })
        });
    }

    stop() {
        if (!this.source) {
            throw new Error('Trying to stop RenderedAudioSegment that has not been started');
        }
        this.source.stop();
    }
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
 * Renders segments in a track
 *
 */
function renderTrackSegments(audioContext, range, audioTrack, audioSources) {
    const segments = audioTrack.segments.toList().filter((segment) => {
        return segmentInTimeRange(segment, range.start, range.duration);
    })

    if (segments.size === 0) {
        return null;
    }

    return audioTrack.segments.toList().map((segment) => {
        const audio = audioSources.getIn([segment.sourceId, 'audio']);

        return new RenderedAudioSegment(
            audioContext,
            audio,
            range,
            segment.sourceOffset,
            segment.range,
        );
    })
    .toArray();
}

export function renderAudioBuffer(audioContext, range, audioTracks, audioSources) {
    return audioTracks.map((audioTrack) => {
        return renderTrackSegments(
            audioContext,
            range,
            audioTrack,
            audioSources,
        );
    })
    .filter((buffer) => {
        return buffer !== null;
    })
    .toList()
    .toJS();
}
