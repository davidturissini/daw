import { AudioWindow } from "store/audiowindow";
import { RangeDragStartEvent, RangeDragEvent } from "cmp/audiorange/audiorange";

export enum GridStateInputs {
    EditButtonClick = 'EditButtonClick',
    PanButtonClick = 'PanButtonClick',
    CloseButtonClick = 'CloseButtonClick',

    GridRowMouseDown = 'GridRowMouseDown',
    GridRowMouseMove = 'GridRowMouseMove',
    GridRowMouseUp = 'GridRowMouseUp',
    GridContainerClick = 'GridContainerClick',

    DocumentMouseMove = 'DocumentMouseMove',
    DocumentMouseUp = 'DocumentMouseUp',

    RangeDragStart = 'RangeDragStart',
    RangeDrag = 'RangeDrag',
}

export enum GridStateNames {
    Idle = 'idle',
    DrawRange = 'drawRange',
    RangeDrag = 'rangeDrag',
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
    [GridStateInputs.GridContainerClick]?: (fsm: GridFSM, evt: MouseEvent) => void;
    [GridStateInputs.DocumentMouseMove]?: (fsm: GridFSM, evt: MouseEvent) => void;
    [GridStateInputs.DocumentMouseUp]?: (fsm: GridFSM, evt: MouseEvent) => void;

    [GridStateInputs.PanButtonClick]?: (fsm: GridFSM, evt: MouseEvent) => void;

    [GridStateInputs.RangeDragStart]?: (fsm: GridFSM, evt: RangeDragStartEvent) => void;
    [GridStateInputs.RangeDrag]?: (fsm: GridFSM, evt: RangeDragEvent) => void;
}

export interface GridFSM {
    state: GridState;
    states: {[key in GridStateNames]: GridStateCtor},
    enterState(name: GridStateNames, ...args: any[]): void;
    stateInput<T>(name: GridStateInputs, evt: T, ...args: any[]): void;

    audioWindow: AudioWindow | null;
    dispatchEvent: HTMLElement['dispatchEvent']
}
