import { LightningElement, api, track } from 'lwc';
import { Rect, rectToCSS, Frame, Origin } from 'util/geometry';
import { TickRange, Tick, divideTickRange, SIXTEENTH_BEAT, ceil, floor, tickRange, tickPlus, absolutePixelToTick, pixelToTick } from 'store/tick';
import { NoteVariant, NoteViewData } from 'notes/index';
import { AudioWindowDragStartEvent, audioWindowDragStartEvent } from 'event/audiowindowdragstartevent';
import { AudioWindowDragEvent, audioWindowDragEvent } from 'event/audiowindowdragevent';
import { Tempo } from 'store/project';
import { Marker, MarkerVariant } from 'markers/index';
import interactjs, { Interactable } from 'interactjs';

export interface AudioWindowTickRange {
    rect: Rect;
    range: TickRange;
    id: string;
    variant: NoteVariant;
    data: NoteViewData;
}

interface TickRangeViewModel {
    id: string;
    key: string;
    range: TickRange;
    style: string;
    isDrumMachineNote: boolean;
    isBeatLabelNote: boolean;
    isMidiNote: boolean;
    data: NoteViewData;
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
    @api markers: Marker<any>[] = [];
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
                id: tickRange.id,
                key: tickRange.id,
                tickRect,
                variant: tickRange.variant,
                data: tickRange.data,
            };
        })
        .map(({ range, id, key, tickRect, variant, data }) => {
            const isDrumMachineNote = variant === NoteVariant.DrumMachineNote;
            const isBeatLabelNote = variant === NoteVariant.BeatLabelNote;
            const isMidiNote = variant === NoteVariant.MidiNote;
            return {
                id,
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
     * Lifecycle
     *
     */
    connectedCallback() {
        requestAnimationFrame(() => {
            const clientRect = this.getBoundingClientRect();
            this.rect = {
                width: clientRect.width,
                height: clientRect.height,
                x: clientRect.left,
                y: clientRect.top,
            };

        });
    }

    containerInteractable: Interactable | null = null;
    renderedCallback() {
        if (!this.containerInteractable) {
            let origin: Origin | null = null;
            this.containerInteractable = interactjs(this.template.querySelector('.container')).draggable({
                onstart: (evt) => {
                    const x = evt.x0 - this.rect!.x;
                    origin = {
                        x,
                        y: evt.y0 - this.rect!.y,
                    };
                    const tick = pixelToTick(this.rect!, this.visibleRange, x);
                    const event: AudioWindowDragStartEvent = audioWindowDragStartEvent(origin, tick);
                    this.dispatchEvent(event);
                },
                onmove: (evt) => {
                    const delta = pixelToTick(this.rect!, this.visibleRange, evt.dx);
                    const event: AudioWindowDragEvent = audioWindowDragEvent(origin!, delta);
                    this.dispatchEvent(event);
                },
                onend: () => {

                }
            })
        }
    }

    disconnectedCallback() {
        (this.containerInteractable as any).unset();
    }
}
