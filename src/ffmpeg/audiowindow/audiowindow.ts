import { LightningElement, api, track } from 'lwc';
import { Rect, rectToCSS, Frame, Origin } from 'util/geometry';
import { TickRange, Tick, tick, divideTickRange, SIXTEENTH_BEAT, ceil, floor, tickRange, tickPlus } from 'store/tick';
import { NoteVariant, NoteViewData } from 'notes/index';
import { AudioWindowDragStartEvent, audioWindowDragStartEvent } from 'event/audiowindowdragstartevent';
import { AudioWindowDragEvent, audioWindowDragEvent } from 'event/audiowindowdragevent';
import { Tempo } from 'store/project';
import { Marker, MarkerVariant } from 'markers/index';

export interface AudioWindowTickRange {
    rect: Rect;
    range: TickRange;
    id: string;
    variant: NoteVariant;
    data: NoteViewData;
}

interface TickRangeViewModel {
    range: TickRange;
    style: string;
    isDrumMachineNote: boolean;
    isBeatLabelNote: boolean;
    isMidiNote: boolean;
    data: NoteViewData;
}

function pixelToTick(frame: Frame, range: TickRange, pixel: number): Tick {
    const { width } = frame;
    const percent = (pixel / width);

    const index = percent * range.duration.index;
    return tick(index);
}

function absolutePixelToTick(frame: Frame, range: TickRange, pixel: number): Tick {
    const tick = pixelToTick(frame, range, pixel);
    return tickPlus(tick, range.start);
}

function tickToPixel(tick: Tick, range: TickRange, frame: Frame): number {
    const { width } = frame;
    const percent = (tick.index - range.start.index) / range.duration.index;
    return percent * width;
}

function tickDurationToWidth(duration: Tick, range: TickRange, frame: Frame): number {
    const { width } = frame;
    const pixelsPerMillisecond = width / range.duration.index;

    return pixelsPerMillisecond * duration.index
}

interface MarkerViewModel<T> {
    key: string | number;
    tick: Tick;
    style: string;
    isCursorVariant: boolean;
    data: T;
}

export default class AudioWindowElement extends LightningElement {
    @api visibleRange: TickRange;
    @api tickRanges: AudioWindowTickRange[] = [];
    @api padding: Frame = { width: 0, height: 0 };
    @api quanitizeResolution: Tick = SIXTEENTH_BEAT;
    @api showGrid: boolean = false;
    @api tempo: Tempo;
    @api markers: Marker[] = [];
    @track rect: Rect | null = null;

    get tickRangesViewModels(): TickRangeViewModel[] {
        const { visibleRange, tickRanges, rect, padding } = this;
        if (!rect) {
            return [];
        }
        return tickRanges.map((tickRange) => {
            const width = tickDurationToWidth(tickRange.range.duration, visibleRange, rect) - padding.width;
            const x = tickToPixel(tickRange.range.start, visibleRange, rect) + (padding.width / 2);
            const tickRect: Rect = {
                y: tickRange.rect.y,
                height: tickRange.rect.height,
                x,
                width,
            }
            return {
                range: tickRange.range,
                key: tickRange.id,
                tickRect,
                variant: tickRange.variant,
                data: tickRange.data,
            };
        })
        .map(({ range, key, tickRect, variant, data }) => {
            const isDrumMachineNote = variant === NoteVariant.DrumMachineNote;
            const isBeatLabelNote = variant === NoteVariant.BeatLabelNote;
            const isMidiNote = variant === NoteVariant.MidiNote;
            return {
                range,
                key,
                style: rectToCSS(tickRect),
                isDrumMachineNote,
                isBeatLabelNote,
                isMidiNote,
                data,
            }
        })
    }

    get hasFrame() {
        return this.rect !== null;
    }

    get tickLines() {
        const { visibleRange, rect, quanitizeResolution, tempo } = this;
        if (!rect) {
            return [];
        }
        const start = ceil(quanitizeResolution, visibleRange.start, tempo);
        const duration = floor(quanitizeResolution, visibleRange.duration, tempo);

        return divideTickRange(tickRange(start, duration), quanitizeResolution).map((range) => {
            const rangeRect: Rect = {
                x: tickToPixel(range.start, visibleRange, rect),
                y: 0,
                width: 1,
                height: rect.height,
            }
            return {
                key: range.start.index,
                style: rectToCSS(rangeRect),
            };
        });
    }

    get markerViewModels(): MarkerViewModel<any>[] {
        const { visibleRange, rect } = this;
        if(rect === null) {
            return [];
        }
        return this.markers.map((marker) => {
            const markerRect: Rect = {
                x: tickToPixel(marker.tick, visibleRange, rect),
                y: 0,
                width: 1,
                height: rect.height,
            }
            const isCursorVariant = marker.variant === MarkerVariant.Cursor;
            return {
                key: marker.key,
                tick: marker.tick,
                style: rectToCSS(markerRect),
                isCursorVariant,
                data: marker.data,
            }
        });
    }

    /*
     *
     * Events
     *
     */
    mouseDown: {
        origin: Origin;
        previousX: number;
    } | null = null;
    onContainerMouseDown(evt: MouseEvent) {
        const { rect } = this;
        if (rect === null) {
            return;
        }
        const x = evt.x - rect.x;
        const y = evt.y - rect.y;
        const origin: Origin = {
            x,
            y,
        };
        this.mouseDown = {
            origin,
            previousX: x,
        };

        const tick = absolutePixelToTick(rect, this.visibleRange, x);
        const event: AudioWindowDragStartEvent = audioWindowDragStartEvent(origin, tick);
        this.dispatchEvent(event);
    }

    onContainerMouseMove(evt: MouseEvent) {
        const { rect, mouseDown } = this;
        if (rect === null || mouseDown === null) {
            return;
        }

        const { origin, previousX } = mouseDown;
        const x = (evt.x - rect.x) - previousX;
        mouseDown.previousX = (evt.x - rect.x);
        const delta = pixelToTick(rect, this.visibleRange, x);
        const event: AudioWindowDragEvent = audioWindowDragEvent(origin, delta);
        this.dispatchEvent(event);
    }

    onDocumentMouseUp = (evt: MouseEvent) => {
        this.mouseDown = null;
    }

    /*
     *
     * Lifecycle
     *
     */
    connectedCallback() {
        requestAnimationFrame(() => {
            const rect = this.getBoundingClientRect();
            this.rect = {
                width: rect.width,
                height: rect.height,
                x: rect.left,
                y: rect.top,
            };
        });

        document.addEventListener('mouseup', this.onDocumentMouseUp);
    }

    disconnectedCallback() {
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
    }
}
