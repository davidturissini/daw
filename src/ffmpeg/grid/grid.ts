import { LightningElement, track, wire, api } from 'lwc';
import { Time, timeZero, Beat, beatToTime } from '../../util/time';
import { pixelToTime, Rect, Frame } from 'util/geometry';
import { AudioRange, BeatRange, containsTime } from 'util/audiorange';
import { wireSymbol } from 'store/index';
import { Color } from 'util/color';
import { mapBeatMarks, mapTimeMarks } from 'store/audiowindow';
import { GridStateNames, GridState, GridStateInputs, GridFSM, GridStateCtor } from './states/types';
import { IdleState } from './states/idle';
import { DrawRangeState } from './states/drawrange';
import { RangeDragEvent, RangeDragStartEvent, RangeDragEndEvent } from 'cmp/audiorange/audiorange';
import { RangeDragState } from './states/rangedrag';
import rafThrottle from 'raf-throttle';
import { CursorDragEvent, CursorDragStartEvent, CursorDragEndEvent } from 'cmp/cursor/cursor';
import { DurationCursorDragState } from './states/durationcursordrag';
import { ProjectState } from 'store/project/reducer';
import { Project } from 'store/project';
import { isAudioRangeElement, AudioRangeElement } from 'cmp/audiowindow/audiowindow';

export interface GridRange {
    itemId: string;
    range: AudioRange | BeatRange;
    color: Color;
}

export enum GridTimeVariant {
    Time = 'time',
    Beats = 'beats',
}

export interface AudioWindow {
    rect: Rect;
    visibleRange: AudioRange;
    quanitization: Beat;
}

export default class GridElement extends LightningElement implements GridFSM {
    @api canClose: boolean = false;
    @api range: AudioRange | null = null;
    @track timeVariant: GridTimeVariant = GridTimeVariant.Beats;
    @track interactionStateName: GridStateNames;
    @track gridContainerRect: Rect | null = null;
    @track audioWindow: AudioWindow | null = null;
    @track rowFrames: { [key: string]: { rect: Rect }} = {};

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

    get hasRange(): boolean {
        return this.audioWindow !== null && this.range !== null;
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
    get virtualCursorInRange() {
        return false;
    }

    /*
     *
     * Cursor Events
     *
     */
    onDurationCursorDrag(evt: CursorDragEvent) {
        this.stateInput(GridStateInputs.DurationCursorDrag, evt);
    }

    onDurationCursorDragStart(evt: CursorDragStartEvent) {
        this.stateInput(GridStateInputs.DurationCursorDragStart, evt);
    }

    onDurationCursorDragEnd(evt: CursorDragEndEvent) {
        this.stateInput(GridStateInputs.DurationCursorDragEnd, evt);
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

    get gridLines(): Time[] {
        const { audioWindow } = this;
        if (audioWindow === null) {
            return [];
        }

        if (this.timeVariant === GridTimeVariant.Time) {
            const time = beatToTime(audioWindow.quanitization, this.project.tempo);
            return mapTimeMarks<Time>(audioWindow, time, (time: Time) => {
                return time;
            });
        }

        return mapBeatMarks<Time>(audioWindow, this.project.tempo, (beat: Number, time: Time) => {
            return time;
        });
    }

    get durationMarkerIsVisible() {
        const { audioWindow, range } = this;
        if (audioWindow === null || range === null) {
            return false;
        }

        return containsTime(range.duration, audioWindow.visibleRange);
    }

    onColLeftSlotChange(evt) {
        const target = evt.target as HTMLSlotElement;
        requestAnimationFrame(() => {
            this.rowFrames = {};
            target.assignedElements().forEach((elm: HTMLElement) => {
                const rowId = elm.getAttribute('data-row-id') as string;
                const rect: Rect = {
                    height: elm.offsetHeight,
                    width: elm.offsetWidth,
                    x: elm.offsetLeft,
                    y: elm.offsetTop,
                };
                this.rowFrames[rowId] = {
                    rect,
                }
            })
        });
    }

    onRangeSlotChange(evt) {
        const target = evt.target as HTMLSlotElement;
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
    get timelineBpm() {
        return this.project.tempo.beatsPerMinute;
    }

    /*
     *
     * Grid Row Events
     *
     */
    onGridRowMouseDown(evt: MouseEvent) {
        if ((evt.target as HTMLElement).classList.contains('row')) {
            this.stateInput<MouseEvent>(GridStateInputs.GridRowMouseDown, evt);
        }
    }

    onGridRowMouseMove(evt: MouseEvent) {
        if ((evt.target as HTMLElement).classList.contains('row')) {
            this.stateInput(GridStateInputs.GridRowMouseMove, evt);
        }
    }

    onGridRowMouseUp(evt: MouseEvent) {
        if ((evt.target as HTMLElement).classList.contains('row')) {
            this.stateInput(GridStateInputs.GridRowMouseUp, evt);
        }
    }

    /*
     *
     * Grid Container Events
     *
     */
    onGridContainerClick(evt: MouseEvent) {
        this.stateInput(GridStateInputs.GridContainerClick, evt);
    }

    onGridContainerMouseMove = rafThrottle((evt: MouseEvent) => {
        this.stateInput(GridStateInputs.GridContainerMouseMove, evt);
    });

    onGridContainerMouseLeave(evt: MouseEvent) {
        this.stateInput(GridStateInputs.GridContainerMouseLeave, evt);
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

    onRangeDragStart(evt: RangeDragStartEvent) {
        this.stateInput(GridStateInputs.RangeDragStart, evt);
    }
    onRangeDrag(evt: RangeDragEvent) {
        this.stateInput(GridStateInputs.RangeDrag, evt);
    }
    onRangeDragEnd(evt: RangeDragEndEvent) {
        this.stateInput(GridStateInputs.RangeDragEnd, evt);
    }

    /*
     *
     * Events
     *
     */
    onTimelineDrag(evt) {
        const { audioWindow } = this;
        if (audioWindow === null) {
            return;
        }

        const time = pixelToTime(audioWindow.rect, audioWindow.visibleRange, evt.detail.dx);
        let start = audioWindow.visibleRange.start.minus(time);
        if (start.milliseconds < 0) {
            start = timeZero;
        }
        const range = new AudioRange(start, audioWindow.visibleRange.duration);
        this.audioWindow = Object.assign({}, audioWindow, {
            visibleRange: range,
        });
    }

    get gridContainerElement(): HTMLElement {
        return this.template.querySelector('.grid-container') as HTMLElement;
    }

    get hasAudioWindow() {
        return this.audioWindow !== null;
    }

    get cursorFrameStyles() {
        const { gridContainerRect } = this;
        if (!gridContainerRect) {
            return '';
        }

        const { x, y } = gridContainerRect;
        return `transform: translate(${x}px, ${y}px)`;
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

    renderedCallback() {
        if (!this.audioWindow) {
            requestAnimationFrame(() => {
                const { gridContainerElement } = this;
                const bounds: ClientRect = gridContainerElement.getBoundingClientRect();
                const rect: Rect = this.gridContainerRect = {
                    height: bounds.height,
                    width: bounds.width,
                    x: gridContainerElement.offsetLeft,
                    y: gridContainerElement.offsetTop,
                };

                let duration = this.range ? this.range.duration.plus(beatToTime(new Beat(4), this.project.tempo)) : beatToTime(new Beat(10), this.project.tempo);

                this.audioWindow = {
                    rect: rect,
                    quanitization: new Beat(1 / 4),
                    visibleRange: new AudioRange(timeZero, duration),
                };
            });
        }
    }
}
