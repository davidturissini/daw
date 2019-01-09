import { register } from 'wire-service';
import { BehaviorSubject } from 'rxjs';
import { wireObservable } from './../util/wire-observable';
import { Record } from 'immutable';
import { audioContext as defaultAudioContext } from './audiosource';

class MasterOut extends Record({
    gain: 1
}) {}



const masterOutSubject = new BehaviorSubject(new MasterOut());
export const stream = masterOutSubject.asObservable();

const masterOutMap = new WeakMap();

function makeMasterOut(audioContext) {
    const gainNode = audioContext.createGain();

    stream.subscribe((masterOut) => {
        gainNode.gain.value = masterOut.gain;
    });

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    gainNode.connect(analyser);
    analyser.connect(audioContext.destination);

    return {
        nodes: {
            analyser: analyser,
            gain: gainNode,
        },
        master: gainNode,
    };

}

masterOutMap.set(defaultAudioContext, makeMasterOut(defaultAudioContext));

export function getMasterOutChain(audioContext) {
    let value = masterOutMap.get(audioContext);
    if (!value) {
        value = makeMasterOut(audioContext)
        masterOutMap.set(audioContext, value);
    }
    return value;
}

export function connectMasterOut(audioContext, audioNode) {
    const { master } = getMasterOutChain(audioContext);
    audioNode.connect(master);
}

export function setGain(value) {
    masterOutSubject.next(
        masterOutSubject.value.set('gain', value)
    );
}

export const masterOutSym = Symbol();

register(masterOutSym, wireObservable(stream));
