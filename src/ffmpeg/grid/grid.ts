import { LightningElement, track, wire, api } from 'lwc';
import { Time, timeZero, Beat, createBeat } from '../../util/time';
import { Rect } from 'util/geometry';
import { AudioRange, BeatRange, containsTime } from 'util/audiorange';
import { wireSymbol } from 'store/index';
import { Color } from 'util/color';
import { GridStateNames, GridState, GridStateInputs, GridFSM, GridStateCtor } from './states/types';
import { IdleState } from './states/idle';
import { DrawRangeState } from './states/drawrange';
import { RangeDragState } from './states/rangedrag';
import { DurationCursorDragState } from './states/durationcursordrag';
import { ProjectState } from 'store/project/reducer';
import { Project } from 'store/project';
import { isAudioRangeElement, AudioRangeElement, AudioWindowRectChangeEvent } from 'cmp/audiowindow/audiowindow';
import { TimelineDragEvent } from 'cmp/timeline/timeline';

export interface GridRange {
    itemId: string;
    range: AudioRange | BeatRange;
    color: Color;
}

export interface GridRowRectMap {
    [key: string]: {
        index: number;
        rect: Rect;
    }
}

export default class GridElement extends LightningElement implements GridFSM {
    @api canClose: boolean = false;
    @api range: AudioRange = {
        start: timeZero,
        duration: Time.fromSeconds(3),
    };
    @track visibleRange: AudioRange = {
        start: timeZero,
        duration: Time.fromSeconds(4)
    };
    @track interactionStateName: GridStateNames;
    @track rowFrames: GridRowRectMap = {};
    @track hoverCursorMs: number | null = null;
    @track quanitization: Beat = createBeat(1 / 4);

    get hoverCursor(): Time | null {
        const { hoverCursorMs } = this;
        if (!hoverCursorMs) {
            return null;
        }
        return new Time(hoverCursorMs);
    }

    @wire(wireSymbol, {
        paths: {
            project: ['project'],
        }
    })
    storeData: {
        data: {
            project: ProjectState;
        }
    }

    get project(): Project {
        return this.storeData.data.project.currentProject!
    }

    /*
     *
     * States
     *
     */
    state: GridState;
    previousState: GridState | null;

    enterPreviousState() {
        if (this.previousState) {
            this.transitionToState(this.previousState);
        }
    }

    transitionToState(state: GridState) {
        if(this.state) {
            this.state.exit(this)
        }
        this.previousState = this.state;
        this.state = state;
        this.state.enter(this);
    }

    enterState(name: GridStateNames, ...args: any[]) {
        const Ctor = this.states[name] as GridStateCtor;
        const state = new Ctor(...args);
        this.transitionToState(state);

    }

    stateInput<T>(name: GridStateInputs, evt: T, ...args: any[]) {
        const method = this.state[name];
        if (method) {
            method.apply(this.state, [this, evt, ...args]);
        }
    }

    states = {
        [GridStateNames.Idle]: IdleState,
        [GridStateNames.DrawRange]: DrawRangeState,
        [GridStateNames.RangeDrag]: RangeDragState,
        [GridStateNames.DurationCursorDrag]: DurationCursorDragState,
    }

    /*
     *
     * Cursors
     *
     */
    get hoverCursorInRange() {
        const { hoverCursor } = this;
        if (hoverCursor === null) {
            return false;
        }
        return containsTime(hoverCursor, this.visibleRange);
    }

    /*
     *
     * Grid Lines
     *
     */
    get rowViewModels() {
        const vm = Object.keys(this.rowFrames).map((rowId) => {
            const { rect } = this.rowFrames[rowId];
            return {
                id: rowId,
                style: `height: ${rect.height}px;`
            }
        });
        return vm;
    }

    get durationMarkerIsVisible() {
        const { range, visibleRange } = this;
        return containsTime(range.duration, visibleRange);
    }

    onColLeftSlotChange(evt) {
        const target = evt.target as HTMLSlotElement;
        requestAnimationFrame(() => {
            this.rowFrames = {};
            target.assignedElements().forEach((elm: HTMLElement, index: number) => {
                const rowId = elm.getAttribute('data-row-id') as string;
                const box = elm.getBoundingClientRect();
                const rect: Rect = {
                    height: box.height,
                    width: box.width,
                    x: elm.offsetLeft,
                    y: elm.offsetTop,
                };
                this.rowFrames[rowId] = {
                    index,
                    rect,
                }
            });
        });
    }

    onRangeSlotChange(evt) {
        const target = evt.target as HTMLSlotElement;
        const { globalContainerAudioWindowRect } = this;
        if (!globalContainerAudioWindowRect) {
            return;
        }
        requestAnimationFrame(() => {
            target.assignedElements().filter(isAudioRangeElement).forEach((elm: AudioRangeElement) => {
                const rowId = elm.getAttribute('data-row-id') as string;
                const rowFrame = this.rowFrames[rowId];
                elm.style.top = `${rowFrame.rect.y}px`;
                elm.style.height = `${rowFrame.rect.height}px`;
            })
        });
    }

    /*
     *
     * Toolbar
     *
     */
    get isDrawingState() {
        return this.interactionStateName === GridStateNames.DrawRange;
    }

    get isIdleState() {
        return this.interactionStateName === GridStateNames.Idle;
    }

    /*
     *
     * Toolbar Events
     *
     */
    onEditButtonClick(evt: MouseEvent) {
        this.stateInput<MouseEvent>(GridStateInputs.EditButtonClick, evt);
    }

    onIdleButtonClick(evt: MouseEvent) {
        this.stateInput<MouseEvent>(GridStateInputs.PanButtonClick, evt);
    }

    onCloseButtonClick(evt: MouseEvent) {
        this.stateInput<MouseEvent>(GridStateInputs.CloseButtonClick, evt);
    }

    /*
     *
     * Timeline
     *
     */
    get topTimelineMarkers(): Time[] {
        if (this.durationMarkerIsVisible && this.range) {
            return [this.range.duration];
        }
        return [];
    }

    /*
     *
     * Grid Container Events
     *
     */
    onGridContainerClick(evt: MouseEvent) {
        this.stateInput(GridStateInputs.GridContainerClick, evt);
    }

    onGridContainerMouseMove = (evt: MouseEvent) => {
        this.stateInput(GridStateInputs.GridContainerMouseMove, evt);
    };

    onGridContainerMouseLeave(evt: MouseEvent) {
        this.stateInput(GridStateInputs.GridContainerMouseLeave, evt);
    }

    onGridContainerMouseDown(evt: MouseEvent) {
        this.stateInput(GridStateInputs.GridContainerMouseDown, evt);
    }

    containerAudioWindowRect: Rect | null = null;
    globalContainerAudioWindowRect: Rect | null = null;
    onContainerAudioWindowRectChange(evt: AudioWindowRectChangeEvent) {
        this.containerAudioWindowRect = evt.detail.rect;
        this.globalContainerAudioWindowRect = evt.detail.globalRect;
    }

    mainScrollY: number = 0;
    onMainScroll(evt) {
        this.mainScrollY = evt.target.scrollTop;
    }

    /*
     *
     * Document Events
     *
     */
    onDocumentMouseMove = (evt) => {
        this.stateInput(GridStateInputs.DocumentMouseMove, evt);
    }

    onDocumentMouseUp = (evt) => {
        this.stateInput(GridStateInputs.DocumentMouseUp, evt);
    }

    /*
     *
     * Range Events
     *
     */

    onRangeDragStart(evt: DragEvent) {
        this.stateInput(GridStateInputs.RangeDragStart, evt);
    }
    onRangeDrag(evt: DragEvent) {
        this.stateInput(GridStateInputs.RangeDrag, evt);
    }
    onRangeDragEnd(evt: DragEvent) {
        this.stateInput(GridStateInputs.RangeDragEnd, evt);
    }

    /*
     *
     * Events
     *
     */
    onTimelineDrag(evt: TimelineDragEvent) {
        const { visibleRange } = this;
        const { delta } = evt.detail;
        let start = visibleRange.start.minus(delta);
        if (start.lessThan(timeZero)) {
            start = timeZero;
        }

        this.visibleRange = {
            start,
            duration: visibleRange.duration,
        };
    }

    /*
     *
     * Lifecycle
     *
     */
    constructor() {
        super();
        this.enterState(GridStateNames.Idle);
    }

    connectedCallback() {
        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
    }

    disconnectedCallback() {
        document.removeEventListener('mousemove', this.onDocumentMouseMove);
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
    }
}
