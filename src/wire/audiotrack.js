import { register } from 'wire-service';
import { Record, Map as ImmutableMap, List } from 'immutable';
import { BehaviorSubject } from 'rxjs';
import { wireObservable } from '../util/wire-observable';
import { createAudioSourceFromFile } from './audiosource';
import { Time } from './../util/time';

const tracksSubject = new BehaviorSubject(new ImmutableMap());

class AudioTrack extends Record({
    id: null,
    segments: new List(),
}) {

}

export function createTrackAndSourceFile(trackId, sourceId, sourceFile, trackOffset) {
    const track = createTrack(trackId, []);
    createAudioSourceFromFile(sourceId, sourceFile)
        .then((audioSource) => {
            tracksSubject.next(
                tracksSubject.value.updateIn([trackId, 'segments'], (segments) => {
                    return segments.push({
                        sourceOffset: new Time(1000),
                        duration: new Time(audioSource.duration.milliseconds - 2000),
                        offset: trackOffset,
                        sourceId,
                    });
                })
            )
        });
}

export function createTrack(id, segments) {
    const audioTrack = new AudioTrack({
        id,
        segments: new List(segments)
    });
    tracksSubject.next(
        tracksSubject.value.set(id, audioTrack)
    );

    return audioTrack;
}

export const audioTracks = Symbol();

register(audioTracks, wireObservable(tracksSubject.asObservable()));
