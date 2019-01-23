import { StateInterface, BehaviorStateMachine } from 'util/bsm';
import { PianoMouseDownEvent, PianoMouseEnterEvent, PianoMouseLeaveEvent } from './../../piano/piano';

export class BaseState implements StateInterface {
    enter(bsm) {}
    exit(bsm) {}
    onPianoMouseLeave(bsm: BehaviorStateMachine<BaseState>, evt: PianoMouseLeaveEvent) {}
    onPianoMouseDown(bsm: BehaviorStateMachine<BaseState>, evt: PianoMouseDownEvent) {}
    onPianoMouseEnter(bsm: BehaviorStateMachine<BaseState>, evt: PianoMouseEnterEvent) {}
    onDocumentMouseUp(bsm: BehaviorStateMachine<BaseState>, evt: MouseEvent) {}
}
