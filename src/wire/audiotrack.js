import { register } from 'wire-service';
import { Record, Map as ImmutableMap } from 'immutable';
import { BehaviorSubject } from 'rxjs';
import { wireObservable } from '../util/wire-observable';
import { createAudioSourceFromFile } from './audiosource';
import { Time } from './../util/time';
import { generateId } from './../util/uniqueid';

const tracksSubject = new BehaviorSubject(new ImmutableMap());

class AudioTrack extends Record({
    id: null,
    segments: new ImmutableMap(),
}) {

}

class AudioTrackSegment extends Record({
    id: null,
    sourceOffset: null,
    duration: null,
    offset: null,
    sourceId: null,
}) {}

export function createTrackAndSourceFile(trackId, sourceId, sourceFile, trackOffset) {
    const track = createTrack(trackId, []);
    const secondTrackId = generateId();
    const secondTrack = createTrack(secondTrackId, []);
    createAudioSourceFromFile(sourceId, sourceFile)
        .then((audioSource) => {
            tracksSubject.next(
                tracksSubject.value.updateIn([trackId, 'segments'], (segments) => {
                    const segmentId = generateId();
                    return segments.set(segmentId, new AudioTrackSegment({
                        id: segmentId,
                        sourceOffset: new Time(1000),
                        duration: new Time(2000),
                        offset: trackOffset,
                        sourceId,
                    }));
                })
                .updateIn([secondTrackId, 'segments'], (segments) => {
                    const segmentId = generateId();
                    return segments.set(segmentId, new AudioTrackSegment({
                        id: segmentId,
                        sourceOffset: new Time(3000),
                        duration: new Time(2000),
                        offset: new Time(3000),
                        sourceId,
                    }));
                })
            )
        });
}

export function moveSegment(trackId, segmentId, time) {
    const track = tracksSubject.value.get(trackId);
    const updatedTrack = track.updateIn(['segments', segmentId], (segment) => {
        const newOffset = new Time(segment.offset.milliseconds + time.milliseconds);
        return segment.set('offset', newOffset);
    });
    tracksSubject.next(
        tracksSubject.value.set(trackId, updatedTrack)
    );
}

export function createTrack(id, segments) {
    const segmentsMap = segments.reduce((seed, segment) => {
        return seed.set(segment.id, segment);
    }, new ImmutableMap());
    const audioTrack = new AudioTrack({
        id,
        segments: segmentsMap,
    });
    tracksSubject.next(
        tracksSubject.value.set(id, audioTrack)
    );

    return audioTrack;
}

export const audioTracks = Symbol();

register(audioTracks, wireObservable(tracksSubject.asObservable()));
