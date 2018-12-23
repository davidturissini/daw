import { register } from 'wire-service';
import { Time } from '../util/time';
import { Record, Map as ImmutableMap } from 'immutable';
import { BehaviorSubject } from 'rxjs';
import { wireObservable } from '../util/wire-observable';

export const audioContext = new AudioContext();
const audioSourcesSubject = new BehaviorSubject(new ImmutableMap());
export const stream = audioSourcesSubject.asObservable();

export const AudioSourceState = {
    LOADING: 'LOADING',
    READY: 'READY',
}

export function getTrackById(id) {
    return tracks[id];
}

class AudioSource extends Record({
    title: null,
    id: null,
    data: null,
    audio: null,
    duration: null,
    state: null,
}) {

}

export function createAudioSourceFromFile(id, file) {
    const source = new AudioSource({
        title: file.name,
        id,
        state: AudioSourceState.LOADING,
    });
    audioSourcesSubject.next(
        audioSourcesSubject.value.set(id, source)
    );

    return new Promise((res) => {
        const reader = new FileReader();
        reader.onload = () => {
            const clone = reader.result.slice(0);
            audioContext.decodeAudioData(reader.result, (audioBuffer) => {
                const duration = Time.fromSeconds(audioBuffer.duration);
                const ready = audioSourcesSubject.value
                    .mergeIn([id], {
                        duration,
                        data: clone,
                        audio: audioBuffer,
                        state: AudioSourceState.READY,
                    });

                audioSourcesSubject.next(ready);
                res(ready.get(id));
            });
        }
        reader.readAsArrayBuffer(file);
    });

}

export const audioSources = Symbol();

register(audioSources, wireObservable(stream));
