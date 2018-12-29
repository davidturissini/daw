import { register } from 'wire-service';
import { Record, Map as ImmutableMap, List } from 'immutable';
import { BehaviorSubject } from 'rxjs';
import { wireObservable } from '../util/wire-observable';
import { createAudioSourceFromFile } from './audiosource';
import { Time, sum as sumTime, subtract as subtractTime } from './../util/time';
import { generateId } from './../util/uniqueid';
import { AudioRange, split as splitAudioRange, relative as makeRelativeAudioRange } from './../util/audiorange';
import { segmentInTimeRange } from './audiorender';

class Color {
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    rgb() {
        const { red, green, blue } = this;
        return `rgb(${red}, ${green}, ${blue})`;
    }
}

const tracksSubject = new BehaviorSubject(new ImmutableMap());
export const stream = tracksSubject.asObservable();
class AudioTrack extends Record({
    title: null,
    id: null,
    segments: new ImmutableMap(),
    selections: new List(),
    color: new Color(202, 162, 40),
    frame: null,
}) {

}

class AudioTrackSegment extends Record({
    id: null,
    sourceOffset: null,
    duration: null,
    offset: null,
    sourceId: null,
}) {}

class TimeRangeSelection extends Record({
    range: null,
    segmentId: null,
}) {}

function segmentAtTimeRange(segments, range) {
    return segments.filter((segment) => {
        return segmentInTimeRange(
            segment,
            range.start,
            range.duration,
        );
    });
}

export function audioTrackRange(audioTrack) {
    if (audioTrack.segments.size === 0) {
        return null;
    }
    const [first, ...segments] = audioTrack.segments.toList().toArray();

    let startMilliseconds = first.offset.milliseconds;
    let endMilliseconds = first.offset.milliseconds + first.duration.milliseconds;

    segments.forEach((segment) => {
        const { offset, duration } = segment;
        const segmentEnd = offset.milliseconds + duration.milliseconds;
        if (offset.milliseconds < startMilliseconds) {
            startMilliseconds = offset.milliseconds;
        }

        if (endMilliseconds < segmentEnd) {
            endMilliseconds = segmentEnd;
        }
    });

    return new AudioRange(new Time(startMilliseconds), new Time(endMilliseconds - startMilliseconds));
}

export function createTrackAndSourceFile(trackId, sourceId, sourceFile, trackOffset) {
    createTrack(trackId, []);
    createAudioSourceFromFile(sourceId, sourceFile)
        .then((audioSource) => {
            tracksSubject.next(
                tracksSubject.value.updateIn([trackId, 'segments'], (segments) => {
                    const segmentId = generateId();
                    return segments.set(segmentId, new AudioTrackSegment({
                        id: segmentId,
                        sourceOffset: new Time(0),
                        duration: audioSource.duration,
                        offset: trackOffset,
                        sourceId,
                    }));
                })
            )
        });
}

export function moveSegment(trackId, segmentId, time) {
    const track = tracksSubject.value.get(trackId);
    const updatedTrack = track.updateIn(['segments', segmentId], (segment) => {
        const nextOffsetMilliseconds = segment.offset.milliseconds + time.milliseconds < 0 ? 0 : segment.offset.milliseconds + time.milliseconds;
        const newOffset = new Time(nextOffsetMilliseconds);
        return segment.set('offset', newOffset);
    });
    tracksSubject.next(
        tracksSubject.value.set(trackId, updatedTrack)
    );
}


function getSourceOffsetDiff(time, sourceOffsetMilliseconds, durationMilliseconds) {
    const end = durationMilliseconds + sourceOffsetMilliseconds - 250; // dont let segment ever be less than 100 milliseconds
    if (sourceOffsetMilliseconds + time.milliseconds < 0) {
        return -sourceOffsetMilliseconds
    } else if (sourceOffsetMilliseconds + time.milliseconds > end) {
        return end - sourceOffsetMilliseconds;
    }

    return time.milliseconds;
}


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

export function setSegmentDuration(trackId, segmentId, audioSource, time) {
    const track = tracksSubject.value.get(trackId);

    const updatedTrack = track.updateIn(['segments', segmentId], (segment) => {
        const nextDurationMilliseconds = getDurationMilliseconds(time, segment.sourceOffset.milliseconds, segment.duration.milliseconds, audioSource.duration.milliseconds);
        const newDuration = new Time(nextDurationMilliseconds);
        return segment.set('duration', newDuration);
    });
    tracksSubject.next(
        tracksSubject.value.set(trackId, updatedTrack)
    );
}

export function deleteSegment(trackId, segmentId) {
    tracksSubject.next(
        tracksSubject.value.deleteIn([trackId, 'segments', segmentId])
    );
}

export function deleteTrack(trackId) {
    tracksSubject.next(
        tracksSubject.value.delete(trackId)
    );
}

export function setSegmentSelection(trackId, segmentId, range) {
    const selection = new TimeRangeSelection({
        segmentId,
        range,
    });
    tracksSubject.next(
        tracksSubject.value.updateIn([trackId, 'selections'], (selections) => {
            return selections.push(selection)
        })
    );
}

function splitSegment(segment, range) {
    const segmentRange = new AudioRange(segment.offset, segment.duration);
    const relative = makeRelativeAudioRange(segmentRange, range);

    return splitAudioRange(segmentRange, relative).map((split) => {
        const diff = subtractTime(split.start, segment.offset);
        return segment.set('offset', split.start)
            .set('duration', split.duration)
            .set('id', generateId())
            .set('sourceOffset', sumTime(segment.sourceOffset, diff));
    });
}

export function deleteSelections() {
    tracksSubject.value.forEach((track) => {
        track.selections.forEach((selection) => {
            const { range: selectionRange, segmentId } = selection;
            const segment = track.segments.get(segmentId);
            const split = splitSegment(segment, selectionRange);

            tracksSubject.next(
                tracksSubject.value.updateIn([track.id, 'segments'], (segments) => {
                    return split.reduce((seed, seg) => {
                        return seed.set(seg.id, seg);
                    }, segments.delete(segment.id))
                })
            )
        })
    })
}

export function moveSegmentSourceOffset(trackId, segmentId, time) {
    const track = tracksSubject.value.get(trackId);
    const updatedTrack = track.updateIn(['segments', segmentId], (segment) => {
        const {
            milliseconds: sourceOffsetMilliseconds,
        } = segment.sourceOffset;
        const diff = getSourceOffsetDiff(time, sourceOffsetMilliseconds, segment.duration.milliseconds);
        const newSourceOffset = new Time(sourceOffsetMilliseconds + diff);
        const newOffset = new Time(segment.offset.milliseconds + diff);
        const newDuration = new Time(segment.duration.milliseconds - diff);
        return segment.set('sourceOffset', newSourceOffset)
            .set('offset', newOffset)
            .set('duration', newDuration)
    });
    tracksSubject.next(
        tracksSubject.value.set(trackId, updatedTrack)
    );
}

export function createTrack(id, segments) {
    const segmentsMap = segments.reduce((seed, segment) => {
        return seed.set(segment.id, segment);
    }, new ImmutableMap());
    const trackLen = tracksSubject.value.size;
    const audioTrack = new AudioTrack({
        title: `Track ${trackLen + 1}`,
        id,
        segments: segmentsMap,
    });
    tracksSubject.next(
        tracksSubject.value.set(id, audioTrack)
    );

    return audioTrack;
}

export function setTrackFrame(trackId, frame) {
    tracksSubject.next(
        tracksSubject.value.setIn([trackId, 'frame'], frame)
    );
}

export const audioTracks = Symbol();

register(audioTracks, wireObservable(stream));
