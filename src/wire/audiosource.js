import { register } from 'wire-service';
import { Time } from '../util/time';
import { Record, Map as ImmutableMap } from 'immutable';
import { BehaviorSubject, Observable } from 'rxjs';
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
    duration: null,
    state: null,
    sampleRate: null,
    channelsCount: null,
}) {

}

function readFile(file) {
    return new Promise((res) => {
        const reader = new FileReader();
        reader.onload = () => {
            res(reader.result);
        }
        reader.readAsArrayBuffer(file);
    });
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


    return readFile(file)
        .then((arraybuffer) => {
            return new Promise((res) => {
                const asset = AV.Asset.fromBuffer(arraybuffer);
                let duration = null;
                let sampleRate = null;
                let channels = null;

                function checkResolve() {
                    if (
                        duration !== null &&
                        sampleRate !== null &&
                        channels !== null
                    ) {
                        res({
                            duration,
                            sampleRate,
                            channels,
                            arraybuffer,
                        });
                    }
                }

                asset.get('duration', (d) => {
                    duration = new Time(d);
                    checkResolve();
                });

                asset.get('format', (format) => {
                    sampleRate = format.sampleRate;
                    channels = format.channelsPerFrame;
                    checkResolve();
                });
            });
        })
        .then(({ arraybuffer, duration, sampleRate, channels }) => {
            const ready = audioSourcesSubject.value
                .mergeIn([id], {
                    duration,
                    data: arraybuffer,
                    state: AudioSourceState.READY,
                    sampleRate,
                    channelsCount: channels,
                });
            audioSourcesSubject.next(ready);
            return ready.get(id);
        });
}

export function getAudioSource(sourceId) {
    return audioSourcesSubject.value.get(sourceId);
}

export const audioSources = Symbol();

register(audioSources, wireObservable(stream));
