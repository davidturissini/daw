import { LightningElement, api, track } from 'lwc';
import { Rect, rectToCSS, Frame, Origin } from 'util/geometry';
import { TickRange, Tick, tick, quanitize, SIXTEENTH_BEAT } from 'store/tick';
import { NoteVariant, NoteViewData } from 'notes/index';
import { AudioWindowDragStartEvent, audioWindowDragStartEvent } from 'event/audiowindowdragstartevent';
import { AudioWindowDragEvent, audioWindowDragEvent } from 'event/audiowindowdragevent';
import { Tempo } from 'store/project';

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


export default class AudioWindowElement extends LightningElement {
    @api visibleRange: TickRange;
    @api tickRanges: AudioWindowTickRange[] = [];
    @api padding: Frame = { width: 0, height: 0 };
    @api tempo: Tempo;
    @api quanitizeResolution: Tick = SIXTEENTH_BEAT;
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

    /*
     *
     * Events
     *
     */
    mouseDown: {
        origin: Origin;
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
        };

        const tick = pixelToTick(rect, this.visibleRange, x);
        const quanitized = quanitize(this.quanitizeResolution, tick, this.tempo);
        const event: AudioWindowDragStartEvent = audioWindowDragStartEvent(origin, quanitized);
        this.dispatchEvent(event);
    }

    onContainerMouseMove(evt: MouseEvent) {
        const { rect, mouseDown } = this;
        if (rect === null || mouseDown === null) {
            return;
        }

        const { origin } = mouseDown;
        const x = (evt.x - rect.x) - origin.x;
        const delta = pixelToTick(rect, this.visibleRange, x);
        const quanitized = quanitize(this.quanitizeResolution, delta, this.tempo);
        const event: AudioWindowDragEvent = audioWindowDragEvent(origin, quanitized);
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
