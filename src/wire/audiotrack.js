import { register } from 'wire-service';
import { Record, Map as ImmutableMap, List } from 'immutable';
import { BehaviorSubject } from 'rxjs';
import { wireObservable } from '../util/wire-observable';
import { createAudioSourceFromFile } from './audiosource';
import { Time, sum as sumTime, gt, lt } from './../util/time';
import { generateId } from './../util/uniqueid';
import {
    AudioRange,
    relative as makeRelativeAudioRange,
    split as splitAudioRange,
} from './../util/audiorange';
import { createSegment, getSegments, getSegment, deleteSegment } from './audiotracksegment';

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
    segments: new List(),
    selections: new List(),
    color: new Color(202, 162, 40),
    frame: null,
}) {

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

export function getTrackDuration(track) {
    return getTrackSegments(track.id).toArray().reduce((seed, segment) => {
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
        const trackStart = getTrackSegments(track.segments).first().range.start;
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
    const [first, ...segments] = getTrackSegments(audioTrack.id).toArray();

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

export function getTrackSegments(trackId) {
    const segmentIds = tracksSubject.value.getIn([trackId, 'segments']);
    return getSegments(segmentIds);
}

export function createTrackAndSourceFile(trackId, sourceId, sourceFile, trackOffset) {
    createTrack(trackId);
    createAudioSourceFromFile(sourceId, sourceFile)
        .then((audioSource) => {
            tracksSubject.next(
                tracksSubject.value.updateIn([trackId, 'segments'], (segments) => {
                    const segmentId = generateId();
                    createSegment(
                        segmentId,
                        new AudioRange(trackOffset, audioSource.duration),
                        sourceId,
                        new Time(0),
                    );

                    return segments.push(segmentId);
                })
            )
        });
}

export const splitSegment = (trackId, segmentId, range) => {
    const segment = getSegment(segmentId);
    const segmentRange = new AudioRange(segment.offset, segment.duration);
    const relative = makeRelativeAudioRange(segmentRange, range);

    const segmentIds = splitAudioRange(segmentRange, relative).map((split) => {
        const diff = split.start.minus(segment.offset);
        const segmentId = generateId();
        createSegment(
            segmentId,
            split,
            segment.sourceId,
            segment.sourceOffset.plus(diff)
        );

        return segmentId;
    });
    deleteSegment(segmentId);

    const updated = tracksSubject.value.updateIn([trackId, 'segments'], (segments) => {
        const index = segments.indexOf(segmentId);
        return segments.concat(segmentIds).delete(index);
    });
    tracksSubject.next(updated);
}

export const deleteTrackSegment = (trackId, segmentId) => {
    deleteSegment(segmentId);

    const updated = tracksSubject.value.updateIn([trackId, 'segments'], (segments) => {
        const index = segments.indexOf(segmentId);
        return segments.delete(index);
    });

    tracksSubject.next(updated);
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

function getSegmentsInRange(track, range) {
    return getTrackSegments(track.segments).filter((segment) => segmentInTimeRange(segment, range.start, range.duration));
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

export function createTrack(id) {
    const trackLen = tracksSubject.value.size;
    const audioTrack = new AudioTrack({
        title: `Track ${trackLen + 1}`,
        id,
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
