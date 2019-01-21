import { LightningElement, wire, track } from 'lwc';
import { editorSym } from '../../wire/editor';
import interact from 'interactjs';
import { Time } from '../../util/time';
import rafThrottle from 'raf-throttle';


const editor = Symbol();

export default class Timeline extends LightningElement {
    /*
     *
     * Editor
     *
    */
    @wire(editorSym, {})
    editorWireCallback(editor) {
        if (editor.data.frame) {
            this.editor = editor.data;
        }
    }

    get editor() {
        return this[editor];
    }

    set editor(value) {
        this[editor] = value;
        this.updateTicks(value);
    }

    /*
     *
     * Ticks
     *
    */
    @track ticks = [];

    getTickValues(range, tickDistanceMs) {
        const remainder = (range.start.milliseconds % tickDistanceMs);
        const lower = remainder === 0 ? range.start.milliseconds : range.start.milliseconds + (tickDistanceMs - (range.start.milliseconds % tickDistanceMs));
        const upper = Math.floor(range.start.milliseconds + range.duration.milliseconds);
        const numberOfTicks = (upper - lower) / tickDistanceMs;
        const values = [];
        for(let i = 0; i < numberOfTicks; i += 1) {
            values.push(lower + (i * tickDistanceMs));
        }
        return values;
    }

    updateTicks(editor) {
        this.ticks = [];
        const { visibleRange, quanitization } = editor;
        const tickDistanceMs = (quanitization * 4) * 1000;

        const tickValues = this.getTickValues(visibleRange, tickDistanceMs);
        for(let i = 0; i < tickValues.length; i += 1) {
            const time = new Time(tickValues[i]);
            const translateX = editor.timeToPixel(time);
            this.ticks.push({
                time,
                style: `transform: translateX(${translateX}px)`,
            });
        }
    }

    /*
     *
     * Dragging
     *
    */
    onDragStart = () => {
        this.dragging = true;
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
        this.dragging = false;
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
