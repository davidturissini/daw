import { LightningElement, api } from 'lwc';
import { Time } from '../../util/time';
import { AudioWindowTickRange } from 'cmp/audiowindow/audiowindow';
import { Frame } from 'util/geometry';
import { TickRange, divideTickRange, QUARTER_BEAT } from 'store/tick';
import { NoteVariant } from 'notes/index';

export type TimelineDragEvent = CustomEvent<{
    delta: Time;
}>

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
    @api rangePadding: Frame;
    @api visibleRange: TickRange;

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
    // onDrag = rafThrottle((evt) => {
    //     const { audioWindowRect } = this;
    //     if (!audioWindowRect) {
    //         return;
    //     }

    //     const time = pixelToTime(audioWindowRect, this.range, evt.dx);
    //     const customEvent: TimelineDragEvent = new CustomEvent('timelinedrag', {
    //         detail: {
    //             delta: time,
    //         },
    //     });
    //     this.dispatchEvent(customEvent);
    // })
    /*
     *
     * Lifecycle
     *
    */
    // connectedCallback() {
    //     this.interact = interact(this.template.host).draggable({
    //         inertia: true,
    //         axis: 'x',
    //         onmove: this.onDrag,
    //     });
    // }

    // disconnectedCallback() {
    //     (this.interact as any).unset();
    // }
}
