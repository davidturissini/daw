import { LightningElement, api } from 'lwc';
import { AudioWindowTickRange } from 'cmp/audiowindow/audiowindow';
import { Frame } from 'util/geometry';
import { TickRange, divideTickRange, QUARTER_BEAT, tickRange, tickPlus, tickZero, tick, ceil, floor, Tick } from 'store/tick';
import { NoteVariant } from 'notes/index';
import { AudioWindowDragEvent } from 'event/audiowindowdragevent';
import { timelineDragEvent, TimelineDragEvent } from 'event/timelinedrag';
import { Tempo } from 'store/project';
import { Marker } from 'markers/index';
import { Color } from 'util/color';


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
    @api rangePadding: Frame = { height: 0, width: 5 };
    @api visibleRange: TickRange;
    @api tempo: Tempo;
    @api quanitizeResolution: Tick = QUARTER_BEAT;
    @api markers: Marker<any>[] = [];

    get tickRangesViewModels(): AudioWindowTickRange[] {
        const { quanitizeResolution, visibleRange, tempo } = this;
        const start = ceil(quanitizeResolution, visibleRange.start, tempo);
        const duration = floor(quanitizeResolution, visibleRange.duration, tempo);
        return divideTickRange(tickRange(start, duration), quanitizeResolution).map((range: TickRange) => {
            return {
                rect: {
                    x: 0,
                    y: 3,
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

    get audioWindowGridLineColor() {
        return new Color(70, 70, 70);
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
