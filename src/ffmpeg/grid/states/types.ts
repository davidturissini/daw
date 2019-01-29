import { AudioWindow } from "store/audiowindow";
import { RangeDragStartEvent, RangeDragEvent } from "cmp/audiorange/audiorange";
import { Time } from "util/time";

export enum GridStateInputs {
    EditButtonClick = 'EditButtonClick',
    PanButtonClick = 'PanButtonClick',
    CloseButtonClick = 'CloseButtonClick',

    GridRowMouseDown = 'GridRowMouseDown',
    GridRowMouseMove = 'GridRowMouseMove',
    GridRowMouseUp = 'GridRowMouseUp',


    DocumentMouseMove = 'DocumentMouseMove',
    DocumentMouseUp = 'DocumentMouseUp',

    RangeDragStart = 'RangeDragStart',
    RangeDrag = 'RangeDrag',
    RangeDragEnd = 'RangeDragEnd',

    GridContainerClick = 'GridContainerClick',
    GridContainerMouseMove = 'GridContainerMouseMove',
    GridContainerMouseLeave = 'GridContainerMouseLeave',
}

export enum GridStateNames {
    Base = 'base',
    Idle = 'idle',
    DrawRange = 'drawRange',
    RangeDrag = 'rangeDrag',
}

export interface GridStateCtor {
    new(...args): GridState;
}

export interface GridState {
    name: GridStateNames;
    enter: () => void;
    exit: () => void;
    [GridStateInputs.EditButtonClick]?: (fsm: GridFSM, evt: MouseEvent) => void;
    [GridStateInputs.GridRowMouseDown]?: (fsm: GridFSM, evt: MouseEvent) => void;
    [GridStateInputs.GridRowMouseMove]?: (fsm: GridFSM, evt: MouseEvent) => void;
    [GridStateInputs.GridRowMouseUp]?: (fsm: GridFSM, evt: MouseEvent) => void;
    [GridStateInputs.DocumentMouseMove]?: (fsm: GridFSM, evt: MouseEvent) => void;
    [GridStateInputs.DocumentMouseUp]?: (fsm: GridFSM, evt: MouseEvent) => void;

    [GridStateInputs.PanButtonClick]?: (fsm: GridFSM, evt: MouseEvent) => void;

    [GridStateInputs.RangeDragStart]?: (fsm: GridFSM, evt: RangeDragStartEvent) => void;
    [GridStateInputs.RangeDrag]?: (fsm: GridFSM, evt: RangeDragEvent) => void;
    [GridStateInputs.RangeDragEnd]?: (fsm: GridFSM, evt: RangeDragEvent) => void;

    [GridStateInputs.GridContainerClick]?: (fsm: GridFSM, evt: MouseEvent) => void;
    [GridStateInputs.GridContainerMouseMove]?: (fsm: GridFSM, evt: MouseEvent) => void;
    [GridStateInputs.GridContainerMouseLeave]?: (fsm: GridFSM, evt: MouseEvent) => void;
}

export interface GridFSM {
    state: GridState;
    previousState: GridState | null;
    states: {[key in GridStateNames]: GridStateCtor},
    enterState(name: GridStateNames, ...args: any[]): void;
    stateInput<T>(name: GridStateInputs, evt: T, ...args: any[]): void;
    enterPreviousState(): void;

    audioWindow: AudioWindow | null;
    dispatchEvent: HTMLElement['dispatchEvent'];
    cursorTime: Time | null;
}
