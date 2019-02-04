import { BaseState } from './base';
import { BehaviorStateMachine } from 'util/bsm';
import { PianoKeyPressState } from './pianokeypress';

export class IdleState extends BaseState {
    onPianoMouseDown(bsm: BehaviorStateMachine<BaseState>, evt: PianoMouseDownEvent) {
        const { pianoId, name, frequency } = evt.detail;
        bsm.enterState(new PianoKeyPressState(pianoId, name, frequency));
    }
}
