import { FiniteStateMachine, State } from "./fsm";

export enum PianoStateNames {
    Idle = 'idle',
    PlayKeys = 'PlayKeys',
}

export enum PianoStateInputNames {
    PianoKeyMouseDown = 'PianoKeyMouseDown',
    PianoKeyMouseEnter = 'PianoKeyMouseEnter',
    PianoKeyMouseLeave = 'PianoKeyMouseLeave',
    PianoKeyMouseUp = 'PianoKeyMouseUp',


    DocumentMouseUp = 'DocumentMouseUp',
}

export type PianoStateMachine = FiniteStateMachine<PianoStateInputNames, PianoStateNames, PianoState>

export class PianoState implements State {
    enter(fsm: PianoStateMachine) {}
    exit(fsm: PianoStateMachine) {}
    [PianoStateInputNames.PianoKeyMouseDown](fsm: PianoStateMachine, evt: MouseEvent) {}
    [PianoStateInputNames.PianoKeyMouseEnter](fsm: PianoStateMachine, evt: MouseEvent) {}
    [PianoStateInputNames.PianoKeyMouseLeave](fsm: PianoStateMachine, evt: MouseEvent) {}
    [PianoStateInputNames.PianoKeyMouseUp](fsm: PianoStateMachine, evt: MouseEvent) {}

    [PianoStateInputNames.DocumentMouseUp](fsm: PianoStateMachine, evt: MouseEvent) {}
}
