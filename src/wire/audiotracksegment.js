import { Record, Map as ImmutableMap} from 'immutable';
import { BehaviorSubject } from 'rxjs';
import {
    AudioRange,
} from './../util/audiorange';
import { Time, timeZero } from './../util/time';
import { wireObservable } from '../util/wire-observable';
import { register } from 'wire-service';
import { getAudioSource } from './audiosource';

const audioTrackSubject = new BehaviorSubject(new ImmutableMap());
export const stream = audioTrackSubject.asObservable();

class AudioTrackSegment extends Record({
    id: null,
    sourceOffset: null,
    audioTag: null,
    duration: null,
    offset: null,
    sourceId: null,
}) {
    get end() {
        return this.offset.plus(this.duration);
    }

    get range() {
        return new AudioRange(this.offset, this.duration);
    }

    get sourceRange() {
        return new AudioRange(this.sourceOffset, this.duration);
    }
}

function dispatch(func) {
    return (...rest) => {
        const value = func(audioTrackSubject.value, ...rest);
        audioTrackSubject.next(value);
    }
}

export function mapAudioTrackSegments(segmentIds, segmentsMap) {
    return segmentIds.map((segmentId) => {
        return segmentsMap.get(segmentId);
    });
}

export function getSegments(segmentIds) {
    const { value } = audioTrackSubject;
    return mapAudioTrackSegments(segmentIds, value);
}

export function getSegment(segmentId) {
    return audioTrackSubject.value.get(segmentId);
}

export const moveSegment = dispatch((currentState, segmentId, time) => {
    const segment = currentState.get(segmentId);
    const newOffset = segment.offset.plus(time).lessThan(timeZero) ? timeZero : segment.offset.plus(time);
    return currentState.setIn([segmentId, 'offset'], newOffset);
});

export const deleteSegment = dispatch((currentState, segmentId) => {
    return currentState.delete(segmentId);
});

function getSourceOffsetDiff(time, sourceOffsetMilliseconds, durationMilliseconds) {
    const end = durationMilliseconds + sourceOffsetMilliseconds - 250; // dont let segment ever be less than 100 milliseconds
    if (sourceOffsetMilliseconds + time.milliseconds < 0) {
        return -sourceOffsetMilliseconds
    } else if (sourceOffsetMilliseconds + time.milliseconds > end) {
        return end - sourceOffsetMilliseconds;
    }

    return time.milliseconds;
}

export const moveSegmentSourceOffset = dispatch((currentState, segmentId, time) => {
    const segment = currentState.get(segmentId);
    const {
        milliseconds: sourceOffsetMilliseconds,
    } = segment.sourceOffset;
    const diff = getSourceOffsetDiff(time, sourceOffsetMilliseconds, segment.duration.milliseconds);
    const newSourceOffset = new Time(sourceOffsetMilliseconds + diff);
    const newOffset = new Time(segment.offset.milliseconds + diff);
    const newDuration = new Time(segment.duration.milliseconds - diff);
    const seg = segment.set('sourceOffset', newSourceOffset)
        .set('offset', newOffset)
        .set('duration', newDuration)
    return currentState.set(seg.id, seg)
})


export const createSegment = dispatch((currentState, segmentId, range, sourceId, sourceOffset) => {
    const segment = new AudioTrackSegment({
        id: segmentId,
        audioTag: document.createElement('audio'),
        sourceOffset,
        duration: range.duration,
        offset: range.start,
        sourceId,
    });
    return currentState.set(segmentId, segment);
});

function getDurationMilliseconds(time, segmentSourceOffsetMilliseconds, segmentDurationMilliseconds, sourceDurationMilliseconds) {
    const next = time.milliseconds + segmentDurationMilliseconds;
    const max = sourceDurationMilliseconds - segmentSourceOffsetMilliseconds;
    const min = 250;
    if (next > max) {
        return max;
    } else if (next < min) {
        return min;
    }

    return next;
}

export const setSegmentDuration = dispatch((currentState, segmentId, time) => {
    const segment = currentState.get(segmentId);
    const audioSource = getAudioSource(segment.sourceId);

    const nextDurationMilliseconds = getDurationMilliseconds(time, segment.sourceOffset.milliseconds, segment.duration.milliseconds, audioSource.duration.milliseconds);
    const newDuration = new Time(nextDurationMilliseconds);
    const updated = segment.set('duration', newDuration);
    return currentState.set(segmentId, updated);
})


export const audioTrackSegmentsSymbol = Symbol();

register(audioTrackSegmentsSymbol, wireObservable(stream));
