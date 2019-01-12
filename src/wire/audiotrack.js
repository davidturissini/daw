import { register } from 'wire-service';
import { Record, Map as ImmutableMap, List } from 'immutable';
import { BehaviorSubject } from 'rxjs';
import { wireObservable } from '../util/wire-observable';
import { createAudioSourceFromFile } from './audiosource';
import { Time, sum as sumTime, subtract as subtractTime, gt, lt } from './../util/time';
import { generateId } from './../util/uniqueid';
import { AudioRange, split as splitAudioRange, relative as makeRelativeAudioRange } from './../util/audiorange';

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
    audioTag: null,
    duration: null,
    offset: null,
    sourceId: null,
}) {
    get end() {
        return sumTime(this.offset, this.duration);
    }

    get range() {
        return new AudioRange(this.offset, this.duration);
    }

    get sourceRange() {
        return new AudioRange(this.sourceOffset, this.duration);
    }
}

class TimeRangeSelection extends Record({
    range: null,
    segmentId: null,
}) {}

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

export function getTrackDuration(track) {
    return track.segments.toList().toArray().reduce((seed, segment) => {
        if (gt(segment.end, seed)) {
            return segment.end;
        }
        return seed;
    }, new Time(0));
}

export function getTracksDuration(tracks) {
    return tracks.toList().toArray().reduce((seed, track) => {
        const trackDuration = getTrackDuration(track);
        if (gt(trackDuration, seed)) {
            return trackDuration;
        }
        return seed;
    }, new Time(0));
}

export function getTracksStart(tracks) {
    return tracks.toList().reduce((seed, track) => {
        const trackStart = track.segments.first().range.start;
        if (seed === null || trackStart.lessThan(seed)) {
            return trackStart;
        }

        return seed;
    }, null);
}

// Returns the global range for all tracks.
// Essentially chops off any silences at the beginning
// or end of the document
export function getTracksRange(tracks) {
    const duration = getTracksDuration(tracks);
    const start = getTracksStart(tracks);
    return new AudioRange(start, duration);
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
                        audioTag: document.createElement('audio'),
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

export function setSegmentDuration(trackId, segmentId, audioSourceId, time) {
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

export function getSelectedAudioTracks(selectionFrame) {
    const frameBottom = selectionFrame.top + selectionFrame.height;
    return tracksSubject.value.filter((audioTrack) => {
        const { frame: audioTrackFrame } = audioTrack;
        const bottom = audioTrackFrame.top + audioTrackFrame.height;
        const midHeight = audioTrackFrame.height / 2;
        return (
            selectionFrame.top <= (audioTrackFrame.top + midHeight) &&
            frameBottom >= (bottom - midHeight)
        );
    });
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
            .set('sourceOffset', sumTime(segment.sourceOffset, diff))
            .set('audioTag', document.createElement('audio'));
    });
}

function getSegmentsInRange(track, range) {
    return track.segments.filter((segment) => segmentInTimeRange(segment, range.start, range.duration));
}

export function collapseRange(range) {
    tracksSubject.value.forEach((track) => {
        getSegmentsInRange(track, range).forEach((segment) => {
            const split = splitSegment(segment, range);
            const second = split[1];
            split[1] = second.set('offset', second.offset.minus(range.duration));

            const next = tracksSubject.value.updateIn([track.id, 'segments'], (segments) => {
                return split.reduce((seed, seg) => {
                    return seed.set(seg.id, seg);
                }, segments.delete(segment.id))
            })


            tracksSubject.next(next);
        })
    })
}

export function deleteRange(range) {
    tracksSubject.value.forEach((track) => {
        getSegmentsInRange(track, range).forEach((segment) => {
            const split = splitSegment(segment, range);
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

export function clearSelections() {
    tracksSubject.value.forEach((track) => {
        tracksSubject.next(
            tracksSubject.value.setIn([track.id, 'selections'], new List())
        )
    })
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
                .setIn([track.id, 'selections'], new List())
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
