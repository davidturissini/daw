import { LightningElement, api, track } from 'lwc';
import { Rect, rectToCSS, Frame } from 'util/geometry';
import { TickRange, Tick } from 'store/tick';
import { NoteVariant, NoteViewData } from 'notes/index';

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


export default class AudioWindowElement extends LightningElement {
    @api visibleRange: TickRange;
    @api tickRanges: AudioWindowTickRange[] = [];
    @api padding: Frame = { width: 0, height: 0 };
    @track frame: Frame | null = null;

    get tickRangesViewModels(): TickRangeViewModel[] {
        const { visibleRange, tickRanges, frame, padding } = this;
        if (!frame) {
            return [];
        }
        return tickRanges.map((tickRange) => {
            const width = tickDurationToWidth(tickRange.range.duration, visibleRange, frame) - padding.width;
            const x = tickToPixel(tickRange.range.start, visibleRange, frame) + (padding.width / 2);
            const rect: Rect = {
                y: tickRange.rect.y,
                height: tickRange.rect.height,
                x,
                width,
            }
            return {
                range: tickRange.range,
                key: tickRange.id,
                rect,
                variant: tickRange.variant,
                data: tickRange.data,
            };
        })
        .map(({ range, key, rect, variant, data }) => {
            const isDrumMachineNote = variant === NoteVariant.DrumMachineNote;
            return {
                range,
                key,
                style: rectToCSS(rect),
                isDrumMachineNote,
                data,
            }
        })
    }

    get hasFrame() {
        return this.frame !== null;
    }

    connectedCallback() {
        const rect = this.getBoundingClientRect();
        this.frame = {
            width: rect.width,
            height: rect.height,
        };
    }
}
