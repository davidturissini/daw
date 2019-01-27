import { LightningElement, track, wire, api } from 'lwc';
import { Time, timeZero } from '../../util/time';
import { timeToPixel, Frame, pixelToTime, absolutePixelToTime } from 'util/geometry';
import { AudioRange } from 'util/audiorange';
import { generateId } from 'util/uniqueid';
import { wireSymbol, appStore } from 'store/index';
import { AudioWindowState } from 'store/audiowindow/reducer';
import { createAudioWindow, setAudioWindowVisibleRange } from 'store/audiowindow/action';
import { Color } from 'util/color';
import { TimelineVariant } from 'cmp/timeline/timeline';
import { AudioWindow, mapBeatMarks, mapTimeMarks } from 'store/audiowindow';

export type TimelineMouseEnterEvent = CustomEvent<{}>;
export type TimelineMouseLeaveEvent = CustomEvent<{}>;
export type TimelineDragEvent = CustomEvent<{
    dx: number;
    windowId: string;
}>;
export type TimelineDragStartEvent = CustomEvent<{
    windowId: string;
}>;
export type TimelineDragEndEvent = CustomEvent<{
    windowId: string;
}>;

export type AudioRangeCreatedEvent = CustomEvent<{
    range: AudioRange;
    parentId: string;
    id: string;
}>;

export type AudioRangeChangeEvent = CustomEvent<{
    range: AudioRange;
    id: string;
    parentId: string;
}>

export type GridAudioWindowCreatedEvent = CustomEvent<{
    windowId: string;
}>

export interface GridRange {
    itemId: string;
    range: AudioRange;
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

enum GridStateInputs {
    EditButtonClick = 'EditButtonClick',
    GridRowMouseDown = 'GridRowMouseDown',
    GridRowMouseMove = 'GridRowMouseMove',
    GridRowMouseUp = 'GridRowMouseUp',

    DocumentMouseMove = 'DocumentMouseMove',
    DocumentMouseUp = 'DocumentMouseUp',
}

enum GridStateNames {
    Idle = 'idle',
    DrawRange = 'drawRange',
}

interface GridStateCtor {
    new(...args): GridState;
}

interface GridState {
    enter: () => void;
    exit: () => void;
    [GridStateInputs.EditButtonClick]?: (fsm: GridElement, evt: MouseEvent) => void;
    [GridStateInputs.GridRowMouseDown]?: (fsm: GridElement, evt: MouseEvent) => void;
    [GridStateInputs.GridRowMouseMove]?: (fsm: GridElement, evt: MouseEvent) => void;
    [GridStateInputs.GridRowMouseUp]?: (fsm: GridElement, evt: MouseEvent) => void;

    [GridStateInputs.DocumentMouseMove]?: (fsm: GridElement, evt: MouseEvent) => void;
    [GridStateInputs.DocumentMouseUp]?: (fsm: GridElement, evt: MouseEvent) => void;
}

export default class GridElement extends LightningElement {
    @api rows: GridElementRow[] = [];
    @track timeVariant: GridTimeVariant = GridTimeVariant.Beats;
    @track windowId: string | null;
    @wire(wireSymbol, {
        paths: {
            audiowindow: ['audiowindow', 'items']
        }
    })
    storeData: {
        data: {
            audiowindow: AudioWindowState['items']
        }
    }

    state: GridState;

    enterState(name: GridStateNames, ...args: any[]) {
        if(this.state) {
            this.state.exit()
        }
        const Ctor = this.states[name];
        this.state = new Ctor(...args);
        this.state.enter();
    }

    stateInput(name: GridStateInputs, ...args: any[]) {
        const method = this.state[name];
        if (method) {
            method.apply(this.state, [this, ...args]);
        }
    }

    get rowViewModels() {
        return this.rows.map((row) => {
            return {
                ranges: row.ranges,
                id: row.id,
                style: `height: ${row.height}px`
            }
        })
    }

    /*
     *
     * States
     *
     */
    states: {[key in GridStateNames]: GridStateCtor} = {
        [GridStateNames.Idle]: class IdleState {
            enter() {}
            exit() {}
            [GridStateInputs.EditButtonClick](cmp: GridElement) {
                cmp.enterState(GridStateNames.DrawRange);
            }
        },
        [GridStateNames.DrawRange]: class DrawRangeState {
            parentId: string | null = null;
            startX: number | null = null;
            rangeId: string | null = null;
            range: AudioRange | null = null;
            enter() {}
            exit() {}
            [GridStateInputs.GridRowMouseDown](cmp: GridElement, evt: MouseEvent) {
                evt.preventDefault();
                const { audioWindow } = cmp;
                if (audioWindow === null) {
                    return;
                }
                const rect: ClientRect = (evt.target as HTMLElement).getBoundingClientRect();
                this.startX = evt.x;
                const time = absolutePixelToTime(audioWindow.frame, audioWindow.visibleRange, evt.x - rect.left);
                const range = this.range = new AudioRange(time, timeZero);
                const id = this.rangeId = generateId();
                const parentId = this.parentId = (evt.target as HTMLElement).getAttribute('data-row-id') as string;
                const event: AudioRangeCreatedEvent = new CustomEvent('audiorangecreated', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        id,
                        range,
                        parentId,
                    },
                });
                cmp.dispatchEvent(event);
            }
            [GridStateInputs.DocumentMouseMove](cmp: GridElement, evt: MouseEvent) {
                if (this.startX && this.rangeId && this.range && this.parentId) {
                    const { audioWindow } = cmp;
                    if (audioWindow === null) {
                        return;
                    }
                    const diff = evt.x - this.startX;
                    const time = pixelToTime(audioWindow.frame, audioWindow.visibleRange, diff);
                    const next = new AudioRange(this.range.start, time);

                    const event: AudioRangeChangeEvent = new CustomEvent('audiorangechange', {
                        bubbles: true,
                        composed: true,
                        detail: {
                            range: next,
                            id: this.rangeId,
                            parentId: this.parentId,
                        },
                    });
                    cmp.dispatchEvent(event);
                }
            }
            [GridStateInputs.DocumentMouseUp](cmp: GridElement, evt: MouseEvent) {
                cmp.enterState(GridStateNames.DrawRange, []);
            }
            [GridStateInputs.EditButtonClick](cmp: GridElement) {
                cmp.enterState(GridStateNames.Idle, []);
            }
        }
    }

    get gridLines(): GridLine[] {
        const { audioWindow } = this;
        if (audioWindow === null) {
            return [];
        }

        if (this.timeVariant === GridTimeVariant.Time) {
            return mapTimeMarks<GridLine>(audioWindow, Time.fromSeconds(audioWindow.quanitization), (time: Time) => {
                const translateX = timeToPixel(audioWindow.frame, audioWindow.visibleRange, time);
                return {
                    time,
                    style: `transform: translateX(${translateX}px)`,
                };
            });
        }

        return mapBeatMarks<GridLine>(audioWindow, this.timelineBpm, (beat: Number, time: Time) => {
            const translateX = timeToPixel(audioWindow.frame, audioWindow.visibleRange, time);
            return {
                time,
                style: `transform: translateX(${translateX}px)`,
            };
        });
    }

    /*
     *
     * Timeline
     *
     */
    get timelineBpm() {
        return 128;
    }

    get timelineVariant() {
        if (this.timeVariant === GridTimeVariant.Time) {
            return TimelineVariant.Time;
        }
        return TimelineVariant.Beats;
    }

    /*
     *
     * Toolbar Events
     *
     */
    onEditButtonClick(evt) {
        this.stateInput(GridStateInputs.EditButtonClick, evt);
    }

    /*
     *
     * Grid Events
     *
     */
    onGridRowMouseDown(evt) {
        if (evt.target.classList.contains('row')) {
            this.stateInput(GridStateInputs.GridRowMouseDown, evt);
        }
    }

    onGridRowMouseMove(evt) {
        if (evt.target.classList.contains('row')) {
            this.stateInput(GridStateInputs.GridRowMouseMove, evt);
        }
    }

    onGridRowMouseUp(evt) {
        if (evt.target.classList.contains('row')) {
            this.stateInput(GridStateInputs.GridRowMouseUp, evt);
        }
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
     * Events
     *
     */
    onTimelineDrag(evt) {
        const { audioWindow, windowId } = this;
        if (audioWindow === null || windowId === null) {
            return;
        }

        const time = pixelToTime(audioWindow.frame, audioWindow.visibleRange, evt.detail.dx);
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
                const frame: Frame = {
                    height: bounds.height,
                    width: bounds.width,
                };

                appStore.dispatch(
                    createAudioWindow(windowId, frame, 1 / 4, new AudioRange(timeZero, Time.fromSeconds(9))),
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
