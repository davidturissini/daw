import { LightningElement, api } from 'lwc';
import interact, { Interactable } from 'interactjs';
import { Time, Beat } from '../../util/time';
import rafThrottle from 'raf-throttle';
import { mapTimeMarks, mapBeatMarks } from 'store/audiowindow';
import { Tempo } from 'store/project';
import { AudioRange } from 'util/audiorange';
import { AudioWindowRectChangeEvent } from 'cmp/audiowindow/audiowindow';
import { Rect, pixelToTime } from 'util/geometry';

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
    interact: Interactable;
    @api range: AudioRange;
    @api tempo: Tempo;
    @api variant: TimelineVariant = TimelineVariant.Time;
    @api markers: Time[] = [];
    audioWindowRect: Rect | null = null;

    get isTimeVariant() {
        return this.variant === TimelineVariant.Time;
    }

    get isBeatVariant() {
        return this.variant === TimelineVariant.Beats;
    }

    get ticks(): Time[] {
        const { range, tempo } = this;
        const resolution = Time.fromSeconds(getResolution(range.duration) * 4);
        if (this.variant === TimelineVariant.Time) {
            return mapTimeMarks<Time>(range, resolution, (time: Time) => {
                return time;
            });
        }

        return mapBeatMarks<Time>(range, new Beat(1/4), tempo, (beat: Beat, time: Time) => {
            return time;
        });
    }

    onAudioWindowRectChange(evt: AudioWindowRectChangeEvent) {
        this.audioWindowRect = evt.detail.rect;
    }

    /*
     *
     * Dragging
     *
    */
    onDrag = rafThrottle((evt) => {
        const { audioWindowRect } = this;
        if (!audioWindowRect) {
            return;
        }

        const time = pixelToTime(audioWindowRect, this.range, evt.dx);
        const customEvent: TimelineDragEvent = new CustomEvent('timelinedrag', {
            detail: {
                delta: time,
            },
        });
        this.dispatchEvent(customEvent);
    })
    /*
     *
     * Lifecycle
     *
    */
    connectedCallback() {
        this.interact = interact(this.template.host).draggable({
            inertia: true,
            axis: 'x',
            onmove: this.onDrag,
        });
    }

    disconnectedCallback() {
        (this.interact as any).unset();
    }
}
