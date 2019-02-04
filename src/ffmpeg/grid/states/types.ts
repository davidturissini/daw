import { AudioWindow } from "store/audiowindow";
import { RangeDragStartEvent, RangeDragEvent } from "cmp/audiorange/audiorange";
import { CursorDragEvent } from "cmp/cursor/cursor";
import { AudioRange } from "util/audiorange";
import { Project } from "store/project";

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

    DurationCursorDragStart = 'DurationCursorDragStart',
    DurationCursorDrag = 'DurationCursorDrag',
    DurationCursorDragEnd = 'DurationCursorDragEnd',
}

export enum GridStateNames {
    Idle = 'idle',
    DrawRange = 'drawRange',
    RangeDrag = 'rangeDrag',
    DurationCursorDrag = 'durationCursorDrag',
}

export interface GridStateCtor {
    new(...args): GridState;
}

export interface GridState {
    enter: (fsm: GridFSM) => void;
    exit: (fsm: GridFSM) => void;
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

    [GridStateInputs.DurationCursorDragStart]?: (fsm: GridFSM, evt: CursorDragEvent) => void;
    [GridStateInputs.DurationCursorDrag]?: (fsm: GridFSM, evt: CursorDragEvent) => void;
    [GridStateInputs.DurationCursorDragEnd]?: (fsm: GridFSM, evt: CursorDragEvent) => void;
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
    range: AudioRange | null;
    interactionStateName: GridStateNames;
    project: Project;
}
