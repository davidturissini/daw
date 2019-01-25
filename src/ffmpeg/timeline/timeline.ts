import { LightningElement, api } from 'lwc';
import interact, { Interactable } from 'interactjs';
import { Time } from '../../util/time';
import rafThrottle from 'raf-throttle';
import { timeToPixel, AudioWindow } from 'util/geometry';

export default class Timeline extends LightningElement {
    interact: Interactable;
    @api audioWindow: AudioWindow;

    getTickValues(range, tickDistanceMs) {
        const remainder = (range.start.milliseconds % tickDistanceMs);
        const lower = remainder === 0 ? range.start.milliseconds : range.start.milliseconds + (tickDistanceMs - (range.start.milliseconds % tickDistanceMs));
        const upper = Math.floor(range.start.milliseconds + range.duration.milliseconds);
        const numberOfTicks = (upper - lower) / tickDistanceMs;
        const values: number[] = [];
        for(let i = 0; i < numberOfTicks; i += 1) {
            values.push(lower + (i * tickDistanceMs));
        }
        return values;
    }

    get ticks() {
        const { audioWindow } = this;
        const { frame, visibleRange, quanitization } = audioWindow;
        if (!frame) {
            return [];
        }
        const tickDistanceMs = (quanitization * 4) * 1000;
        const tickValues = this.getTickValues(visibleRange, tickDistanceMs);
        const ticks: Array<{ time: Time, style: string }> = [];
        for(let i = 0; i < tickValues.length; i += 1) {
            const time = new Time(tickValues[i]);
            const translateX = timeToPixel(frame, visibleRange, time);
            ticks.push({
                time,
                style: `transform: translateX(${translateX}px)`,
            });
        }
        return ticks;
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
}
