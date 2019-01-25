import { LightningElement, track, wire, api } from 'lwc';
import { Time, timeZero } from '../../util/time';
import { timeToPixel, AudioWindow, Frame, pixelToTime, absolutePixelToTime } from 'util/geometry';
import { AudioRange } from 'util/audiorange';
import { generateId } from 'util/uniqueid';
import { wireSymbol, appStore } from 'store/index';
import { AudioWindowState } from 'store/audiowindow/reducer';
import { createAudioWindow, setAudioWindowVisibleRange } from 'store/audiowindow/action';
import { Color } from 'util/color';

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

function getGridTimes(range, tickDistanceMs) {
    const remainder = (range.start.milliseconds % tickDistanceMs);
    const lower = remainder === 0 ? range.start.milliseconds : range.start.milliseconds + (tickDistanceMs - (range.start.milliseconds  % tickDistanceMs));
    const upper = Math.floor(range.start.milliseconds + range.duration.milliseconds);
    const numberOfTicks = (upper - lower) / tickDistanceMs;
    const values: Time[] = [];
    for(let i = 0; i < numberOfTicks; i += 1) {
        const time = new Time(lower + (i * tickDistanceMs));
        values.push(time);
    }
    return values;
}

function gridLines(audioWindow: AudioWindow) {
    const { visibleRange, quanitization } = audioWindow;
    const tickDistanceMs = 1000 * quanitization;
    const ticks: Array<{ time: Time, style: string }> = [];

    const times = getGridTimes(visibleRange, tickDistanceMs);
    for(let i = 0, len = times.length; i < len; i += 1) {
        const time = times[i];
        const translateX = timeToPixel(audioWindow.frame, audioWindow.visibleRange, time);
        ticks.push({
            time,
            style: `transform: translateX(${translateX}px)`,
        });
    }

    return ticks;
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

    get gridLines() {
        const { audioWindow } = this;
        if (audioWindow === null) {
            return [];
        }

        return gridLines(audioWindow);
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
