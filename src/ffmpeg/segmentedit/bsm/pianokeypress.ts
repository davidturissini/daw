import { BaseState } from './base';
import { BehaviorStateMachine } from 'util/bsm';
import { IdleState } from './idle';
import { appStore } from 'store/index';

function createOscillator(audioContext: AudioContext, frequency: number) {
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.setValueAtTime(frequency, 0);
    oscillator.connect(audioContext.destination);
    return oscillator;
}

const { keys } = Object;

export class PianoKeyPressState extends BaseState {
    initialFrequency: number;
    initialName: string;
    pianoId: string;
    constructor(pianoId: string, name: string, frequency: number) {
        super();

        this.initialFrequency = frequency;
        this.initialName = name;
        this.pianoId = pianoId;
    }
    enter() {
        const { initialFrequency, initialName, pianoId } = this;
        appStore.dispatch(
            playKey(pianoId, initialName, initialFrequency)
        );
    }

    exit() {
        appStore.dispatch(
            stopPiano(this.pianoId)
        );
    }

    onPianoMouseEnter(bsm: BehaviorStateMachine<BaseState>, evt: PianoMouseEnterEvent) {
        const { pianoId, name, frequency } = evt.detail;
        appStore.dispatch(
            playKey(pianoId, name, frequency)
        );
    }

    onPianoMouseLeave(bsm: BehaviorStateMachine<BaseState>, evt: PianoMouseLeaveEvent) {
        const { name, pianoId } = evt.detail;
        appStore.dispatch(
            stopKey(pianoId, name)
        )
    }

    onDocumentMouseUp(bsm:  BehaviorStateMachine<BaseState>) {
        bsm.enterState(new IdleState());
    }
}
