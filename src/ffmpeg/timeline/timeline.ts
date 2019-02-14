import { LightningElement, api } from 'lwc';
import { AudioWindowTickRange } from 'cmp/audiowindow/audiowindow';
import { Frame } from 'util/geometry';
import { TickRange, divideTickRange, QUARTER_BEAT, tickRange, tickPlus, tickZero, tick } from 'store/tick';
import { NoteVariant } from 'notes/index';
import { AudioWindowDragEvent } from 'event/audiowindowdragevent';
import { timelineDragEvent, TimelineDragEvent } from 'event/timelinedrag';
import { Tempo } from 'store/project';


export enum TimelineVariant {
    Time = 'time',
    Beats = 'beats',
}

const quanitizationValues = [
    1 / 64,
    1 / 32,
    1 / 16,
    1 / 8,
    1 / 4,
    1 / 2,
    1,
    2,
    4,
    5,
    10,
    30,
    60,
    120,
    240,
];

export function getResolution(duration): number {
    const max = 40;
    let value: number | null = null;
    for(let i = 0; i < quanitizationValues.length; i += 1) {
        const ticks = duration.seconds / quanitizationValues[i];
        if (ticks <= max) {
            value = quanitizationValues[i];
            break;
        }
    }
    if (value === null) {
        value = quanitizationValues[quanitizationValues.length - 1];
    }
    return value;
}


export default class Timeline extends LightningElement {
    @api rangePadding: Frame = { height: 0, width: 0 };
    @api visibleRange: TickRange;
    @api tempo: Tempo;

    get tickRangesViewModels(): AudioWindowTickRange[] {
        return divideTickRange(this.visibleRange, QUARTER_BEAT).map((range: TickRange) => {
            return {
                rect: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                },
                range,
                id: String(range.start.index),
                variant: NoteVariant.BeatLabelNote,
                data: {}
            }
        })
    }

    /*
     *
     * Dragging
     *
    */
    onAudioWindowDrag(evt: AudioWindowDragEvent) {
        const { visibleRange } = this;
        const { delta } = evt.detail;
        const inverted = tick(-delta.index);
        let nextStart = tickPlus(visibleRange.start, inverted);
        if (nextStart.index < 0) {
            nextStart = tickZero;
        }
        const nextRange = tickRange(nextStart, visibleRange.duration);
        const customEvent: TimelineDragEvent = timelineDragEvent(inverted, nextRange);
        this.dispatchEvent(customEvent);
    }
}
