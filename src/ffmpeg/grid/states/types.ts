import { AudioWindow } from "store/audiowindow";

export enum GridStateInputs {
    EditButtonClick = 'EditButtonClick',
    PanButtonClick = 'PanButtonClick',
    GridRowMouseDown = 'GridRowMouseDown',
    GridRowMouseMove = 'GridRowMouseMove',
    GridRowMouseUp = 'GridRowMouseUp',

    DocumentMouseMove = 'DocumentMouseMove',
    DocumentMouseUp = 'DocumentMouseUp',
}

export enum GridStateNames {
    Idle = 'idle',
    DrawRange = 'drawRange',
}

export interface GridStateCtor {
    new(...args): GridState;
}

export interface GridState {
    enter: () => void;
    exit: () => void;
    [GridStateInputs.EditButtonClick]?: (fsm: GridFSM, evt: MouseEvent) => void;
    [GridStateInputs.GridRowMouseDown]?: (fsm: GridFSM, evt: MouseEvent) => void;
    [GridStateInputs.GridRowMouseMove]?: (fsm: GridFSM, evt: MouseEvent) => void;
    [GridStateInputs.GridRowMouseUp]?: (fsm: GridFSM, evt: MouseEvent) => void;

    [GridStateInputs.DocumentMouseMove]?: (fsm: GridFSM, evt: MouseEvent) => void;
    [GridStateInputs.DocumentMouseUp]?: (fsm: GridFSM, evt: MouseEvent) => void;

    [GridStateInputs.PanButtonClick]?: (fsm: GridFSM, evt: MouseEvent) => void;
}

export interface GridFSM {
    state: GridState;
    states: {[key in GridStateNames]: GridStateCtor},
    enterState(name: GridStateNames, ...args: any[]): void;
    stateInput<T>(name: GridStateInputs, evt: T, ...args: any[]): void;

    audioWindow: AudioWindow | null;
    dispatchEvent: HTMLElement['dispatchEvent']
}
