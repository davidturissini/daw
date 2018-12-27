import { register } from 'wire-service';
import { BehaviorSubject } from 'rxjs';
import { wireObservable } from './../util/wire-observable';
import { Record } from 'immutable';
import { audioContext } from './audiosource';

class MasterOut extends Record({
    gain: 5
}) {}

const masterOutSubject = new BehaviorSubject(new MasterOut());
export const stream = masterOutSubject.asObservable();

export function connectMasterOut(bufferSource) {
    const gainNode = audioContext.createGain();

    stream.subscribe((masterOut) => {
        gainNode.gain.value = masterOut.gain;
    });

    bufferSource.connect(gainNode);
    gainNode.connect(audioContext.destination);
}

export function setGain(value) {
    masterOutSubject.next(
        masterOutSubject.value.set('gain', value)
    );
}

export const masterOutSym = Symbol();

register(masterOutSym, wireObservable(stream));
