import { GridRowRectMap } from "cmp/grid/grid";
import { AudioRange } from "util/audiorange";
import { Project } from "store/project";
import { Rect } from "util/geometry";
import { Beat } from "util/time";

export enum GridStateInputs {
    EditButtonClick = 'EditButtonClick',
    PanButtonClick = 'PanButtonClick',
    CloseButtonClick = 'CloseButtonClick',

    DocumentMouseMove = 'DocumentMouseMove',
    DocumentMouseUp = 'DocumentMouseUp',

    RangeDragStart = 'RangeDragStart',
    RangeDrag = 'RangeDrag',
    RangeDragEnd = 'RangeDragEnd',

    GridContainerClick = 'GridContainerClick',
    GridContainerMouseDown = 'GridContainerMouseDown',
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
    [GridStateInputs.DocumentMouseMove]?: (fsm: GridFSM, evt: MouseEvent) => void;
    [GridStateInputs.DocumentMouseUp]?: (fsm: GridFSM, evt: MouseEvent) => void;

    [GridStateInputs.PanButtonClick]?: (fsm: GridFSM, evt: MouseEvent) => void;

    [GridStateInputs.RangeDragStart]?: (fsm: GridFSM, evt: DragEvent) => void;
    [GridStateInputs.RangeDrag]?: (fsm: GridFSM, evt: DragEvent) => void;
    [GridStateInputs.RangeDragEnd]?: (fsm: GridFSM, evt: DragEvent) => void;

    [GridStateInputs.GridContainerClick]?: (fsm: GridFSM, evt: MouseEvent) => void;
    [GridStateInputs.GridContainerMouseDown]?: (fsm: GridFSM, evt: MouseEvent) => void;
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

    dispatchEvent: HTMLElement['dispatchEvent'];
    range: AudioRange | null;
    interactionStateName: GridStateNames;
    project: Project;
    rowFrames: GridRowRectMap;
    hoverCursorMs: number | null;
    containerAudioWindowRect: Rect | null;
    globalContainerAudioWindowRect: Rect | null;
    quanitization: Beat;
    visibleRange: AudioRange;
    mainScrollY: number;
}
