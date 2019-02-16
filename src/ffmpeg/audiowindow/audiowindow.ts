import { LightningElement, api, track } from 'lwc';
import { Rect, rectToCSS, Frame, Origin } from 'util/geometry';
import { TickRange, Tick, divideTickRange, SIXTEENTH_BEAT, ceil, floor, tickRange, tickPlus, absolutePixelToTick, pixelToTick, tickRangeContains, clampTickRange, inTickRange } from 'store/tick';
import { NoteVariant, NoteViewData } from 'notes/index';
import { AudioWindowDragStartEvent, audioWindowDragStartEvent } from 'event/audiowindowdragstartevent';
import { AudioWindowDragEvent, audioWindowDragEvent } from 'event/audiowindowdragevent';
import { Tempo } from 'store/project';
import { Marker, MarkerVariant } from 'markers/index';
import interactjs, { Interactable, DraggableOptions } from 'interactjs';
import rafThrottle from 'raf-throttle';
import { Color } from 'util/color';
import { AudioWindowMouseEnterEvent, audioWindowMouseEnterEvent } from 'event/audiowindowmouseenterevent';
import { audioWindowMouseMoveEvent, AudioWindowMouseMoveEvent } from 'event/audiowindowmousemoveevent';
import { audioWindowMouseLeaveEvent, AudioWindowMouseLeaveEvent } from 'event/audiowindowmouseleaveevent';

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
    isCaretVariant: boolean;
    data: T;
}

export default class AudioWindowElement extends LightningElement {
    @api inertiaDrag: boolean = false;
    @api visibleRange: TickRange;
    @api tickRanges: AudioWindowTickRange[] = [];
    @api padding: Frame = { width: 0, height: 0 };
    @api quanitizeResolution: Tick = SIXTEENTH_BEAT;
    @api showGrid: boolean = false;
    @api tempo: Tempo;
    @api markers: Marker<any>[] = [];
    @api gridLineColor: Color | null = null;
    @track rect: Rect | null = null;

    get tickRangesViewModels(): TickRangeViewModel[] {
        const { visibleRange, tickRanges, rect, padding } = this;
        if (!rect) {
            return [];
        }
        return tickRanges.map((tickRange): AudioWindowTickRange => {
            const clamped = clampTickRange(visibleRange, tickRange.range);
            return Object.assign({}, tickRange, {
                range: clamped,
            });
        })
        .filter((tickRange) => {
            return tickRangeContains(tickRange.range, visibleRange);
        })
        .map((tickRange) => {
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
        const { visibleRange, rect, quanitizeResolution, tempo, gridLineColor } = this;
        if (!rect) {
            return [];
        }
        const start = ceil(quanitizeResolution, visibleRange.start, tempo);
        const duration = floor(quanitizeResolution, visibleRange.duration, tempo);
        const color = gridLineColor || new Color(50, 50, 50);
        return divideTickRange(tickRange(start, duration), quanitizeResolution).map((range) => {
            const rangeRect: Rect = {
                x: tickToPixel(range.start, visibleRange, rect),
                y: 0,
                width: 1,
                height: rect.height,
            }


            return {
                key: range.start.index,
                style: `${rectToCSS(rangeRect)};background: ${color.rgb()}`,
            };
        });
    }

    get markerViewModels(): MarkerViewModel<any>[] {
        const { visibleRange, rect } = this;
        if(rect === null) {
            return [];
        }
        return this.markers.filter((marker) => {
            return inTickRange(marker.tick, visibleRange)
        })
        .map((marker) => {
            const markerRect: Rect = {
                x: tickToPixel(marker.tick, visibleRange, rect),
                y: 0,
                width: 1,
                height: rect.height,
            }
            const isCursorVariant = marker.variant === MarkerVariant.Cursor;
            const isCaretVariant = marker.variant === MarkerVariant.Caret;
            return {
                key: marker.key,
                tick: marker.tick,
                style: rectToCSS(markerRect),
                isCursorVariant,
                isCaretVariant,
                data: marker.data,
            }
        });
    }

    /*
     *
     * Lifecycle
     *
     */
    onContainerMouseEnter(evt: MouseEvent) {
        const { rect, tempo, quanitizeResolution } = this;
        if (!rect) {
            return;
        }
        const { x } = evt;
        const localX = x - rect.x;
        const tick = absolutePixelToTick(rect, this.visibleRange, localX);
        const event: AudioWindowMouseEnterEvent = audioWindowMouseEnterEvent(tick, quanitizeResolution, tempo);
        this.dispatchEvent(event);
    }

    onContainerMouseMove(evt: MouseEvent) {
        const { rect, tempo, quanitizeResolution } = this;
        if (!rect) {
            return;
        }
        const { x } = evt;
        const localX = x - rect.x;
        const tick = absolutePixelToTick(rect, this.visibleRange, localX);
        const event: AudioWindowMouseMoveEvent = audioWindowMouseMoveEvent(tick, quanitizeResolution, tempo);
        this.dispatchEvent(event);
    }

    onContainerMouseLeave(evt: MouseEvent) {
        const event: AudioWindowMouseLeaveEvent = audioWindowMouseLeaveEvent();
        this.dispatchEvent(event);
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

            const dragOptions: DraggableOptions = {
                onstart: (evt) => {
                    const x = evt.x0 - this.rect!.x;
                    origin = {
                        x,
                        y: evt.y0 - this.rect!.y,
                    };
                    const tick = absolutePixelToTick(this.rect!, this.visibleRange, x);
                    const event: AudioWindowDragStartEvent = audioWindowDragStartEvent(origin, tick);
                    this.dispatchEvent(event);
                },
                onmove: rafThrottle((evt) => {
                    const delta = pixelToTick(this.rect!, this.visibleRange, evt.dx);
                    const event: AudioWindowDragEvent = audioWindowDragEvent(origin!, delta);
                    this.dispatchEvent(event);
                }),
                onend: () => {

                },
                inertia: this.inertiaDrag,
            }

            this.containerInteractable = interactjs(this.template.querySelector('.container')).draggable(dragOptions)
        }
    }

    disconnectedCallback() {
        (this.containerInteractable as any).unset();
    }
}
