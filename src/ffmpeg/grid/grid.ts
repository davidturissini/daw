import { LightningElement, track, wire, api } from 'lwc';
import { Time, timeZero, Beat, beatToTime } from '../../util/time';
import { timeToPixel, pixelToTime, Rect } from 'util/geometry';
import { AudioRange, BeatRange } from 'util/audiorange';
import { generateId } from 'util/uniqueid';
import { wireSymbol, appStore } from 'store/index';
import { AudioWindowState } from 'store/audiowindow/reducer';
import { createAudioWindow, setAudioWindowVisibleRange } from 'store/audiowindow/action';
import { Color } from 'util/color';
import { AudioWindow, mapBeatMarks, mapTimeMarks } from 'store/audiowindow';
import { GridStateNames, GridState, GridStateInputs, GridFSM, GridStateCtor } from './states/types';
import { IdleState } from './states/idle';
import { DrawRangeState } from './states/drawrange';
import { TimelineDragStartEvent, TimelineDragEndEvent, GridAudioWindowCreatedEvent } from './events';
import { RangeDragEvent, RangeDragStartEvent, RangeDragEndEvent } from 'cmp/audiorange/audiorange';
import { RangeDragState } from './states/rangedrag';
import rafThrottle from 'raf-throttle';
import { CursorDragEvent, CursorDragStartEvent, CursorDragEndEvent } from 'cmp/cursor/cursor';
import { DurationCursorDragState } from './states/durationcursordrag';
import { ProjectState } from 'store/project/reducer';

export interface GridRange {
    itemId: string;
    range: AudioRange | BeatRange;
    color: Color;
}

export interface GridElementRow {
    id: string;
    height: number;
    ranges: GridRange[];
}

export enum GridTimeVariant {
    Time = 'time',
    Beats = 'beats',
}

interface GridLine {
    time: Time;
    style: string;
}

export default class GridElement extends LightningElement implements GridFSM {
    @api rows: GridElementRow[] = [];
    @api canClose: boolean = false;
    @api range: AudioRange | null = null;
    @track timeVariant: GridTimeVariant = GridTimeVariant.Beats;
    @track interactionStateName: GridStateNames;
    @track windowId: string | null;

    @wire(wireSymbol, {
        paths: {
            audiowindow: ['audiowindow', 'items'],
            project: ['project'],
        }
    })
    storeData: {
        data: {
            audiowindow: AudioWindowState['items'];
            project: ProjectState;
        }
    }

    get project(): ProjectState {
        return this.storeData.data.project;
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
        const { audioWindow } = this;
        if (!audioWindow || !audioWindow.virtualCursor) {
            return false;
        }
        return true;
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
        return this.rows.map((row) => {
            return {
                ranges: row.ranges,
                id: row.id,
                style: `height: ${row.height}px`
            }
        })
    }

    get gridLines(): GridLine[] {
        const { audioWindow } = this;
        if (audioWindow === null) {
            return [];
        }

        if (this.timeVariant === GridTimeVariant.Time) {
            const time = beatToTime(audioWindow.quanitization, this.project.tempo);
            return mapTimeMarks<GridLine>(audioWindow, time, (time: Time) => {
                const translateX = timeToPixel(audioWindow.rect, audioWindow.visibleRange, time);
                return {
                    time,
                    style: `transform: translateX(${translateX}px)`,
                };
            });
        }

        return mapBeatMarks<GridLine>(audioWindow, this.project.tempo, (beat: Number, time: Time) => {
            const translateX = timeToPixel(audioWindow.rect, audioWindow.visibleRange, time);
            return {
                time,
                style: `transform: translateX(${translateX}px)`,
            };
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
        const { audioWindow, windowId } = this;
        if (audioWindow === null || windowId === null) {
            return;
        }

        const time = pixelToTime(audioWindow.rect, audioWindow.visibleRange, evt.detail.dx);
        let start = audioWindow.visibleRange.start.minus(time);
        if (start.milliseconds < 0) {
            start = timeZero;
        }
        const range = new AudioRange(start, audioWindow.visibleRange.duration);
        appStore.dispatch(setAudioWindowVisibleRange(windowId, range));
    }

    onTimelineDragStart(evt) {
        const { windowId } = this;
        if (windowId === null) {
            return;
        }

        const event: TimelineDragStartEvent = new CustomEvent('timelinedragstart', {
            bubbles: true,
            composed: true,
            detail: {
                windowId,
            },
        });
        this.dispatchEvent(event);
    }

    onTimelineDragEnd(evt) {
        const { windowId } = this;
        if (windowId === null) {
            return;
        }

        const event: TimelineDragEndEvent = new CustomEvent('timelinedragend', {
            bubbles: true,
            composed: true,
            detail: {
                windowId,
            },
        });
        this.dispatchEvent(event);
    }

    get gridContainerElement(): HTMLElement {
        return this.template.querySelector('.grid-container') as HTMLElement;
    }

    get audioWindow(): AudioWindow | null {
        if (this.windowId) {
            return this.storeData.data.audiowindow.get(this.windowId) as AudioWindow;
        }
        return null;
    }

    get hasAudioWindow() {
        return this.audioWindow !== null;
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
        if (!this.windowId) {
            requestAnimationFrame(() => {
                const windowId = generateId();
                const bounds: ClientRect = this.gridContainerElement.getBoundingClientRect();
                const rect: Rect = {
                    height: bounds.height,
                    width: bounds.width,
                    x: bounds.left,
                    y: bounds.top,
                };

                let duration = this.range ? this.range.duration.plus(beatToTime(new Beat(4), this.project.tempo)) : beatToTime(new Beat(10), this.project.tempo);
                appStore.dispatch(
                    createAudioWindow(windowId, rect, new Beat(1 / 4), new AudioRange(timeZero, duration)),
                );
                this.windowId = windowId;

                const event: GridAudioWindowCreatedEvent = new CustomEvent('gridaudiowindowcreated', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        windowId,
                    },
                });

                this.dispatchEvent(event);
            });
        }
    }
}
