import { LightningElement, api } from 'lwc';
import interact, { Interactable } from 'interactjs';
import { Time } from '../../util/time';
import rafThrottle from 'raf-throttle';
import { timeToPixel } from 'util/geometry';
import { AudioWindow, mapTimeMarks, mapBeatMarks } from 'store/audiowindow';

export enum TimelineVariant {
    Time = 'time',
    Beats = 'beats',
}

interface TimelineTick {
    time: Time;
    style: string;
    beat?: number;
}


export default class Timeline extends LightningElement {
    interact: Interactable;
    @api audioWindow: AudioWindow;
    @api bpm: number;
    @api variant: TimelineVariant = TimelineVariant.Time;

    get isTimeVariant() {
        return this.variant === TimelineVariant.Time;
    }

    get isBeatVariant() {
        return this.variant === TimelineVariant.Beats;
    }

    get ticks(): TimelineTick[] {
        const { audioWindow, bpm } = this;
        const { frame, visibleRange } = audioWindow;
        const resolution = Time.fromSeconds(audioWindow.quanitization * 4);
        if (this.variant === TimelineVariant.Time) {
            return mapTimeMarks<TimelineTick>(audioWindow, resolution, (time: Time) => {
                const translateX = timeToPixel(frame, visibleRange, time);
                return {
                    time,
                    style: `transform: translateX(${translateX}px)`,
                };
            });
        }

        return mapBeatMarks<TimelineTick>(audioWindow, bpm, (beat: number, time: Time) => {
            const label = (beat % 4 === 0) ? beat / 4 : undefined;
            const translateX = timeToPixel(frame, visibleRange, time);
            return {
                time,
                beat: label,
                style: `transform: translateX(${translateX}px)`,
            };
        });
    }

    /*
     *
     * Dragging
     *
    */
    onDragStart = () => {
        const customEvent = new CustomEvent('timelinedragstart');
        this.dispatchEvent(customEvent);
    }

    onDrag = rafThrottle((evt) => {
        const customEvent = new CustomEvent('timelinedrag', {
            detail: {
                dx: evt.dx,
            },
        });
        this.dispatchEvent(customEvent);
    })

    onDragEnd = () => {
        const customEvent = new CustomEvent('timelinedragend');
        this.dispatchEvent(customEvent);
    }

    /*
     *
     * Lifecycle
     *
    */
    connectedCallback() {
        this.interact = interact(this.template.host).draggable({
            inertia: true,
            axis: 'y',
            onstart: this.onDragStart,
            onmove: this.onDrag,
            onend: this.onDragEnd
        });
    }

    disconnectedCallback() {
        (this.interact as any).unset();
    }
}
