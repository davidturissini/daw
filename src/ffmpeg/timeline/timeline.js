import { LightningElement, wire, track } from 'lwc';
import { editorSym, setVisibleRangeStart } from './../../wire/editor';
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

    getTickValues(range) {
        const tickDistanceMs = 300000;
        const remainder = (range.start.milliseconds % tickDistanceMs);
        const lower = remainder === 0 ? range.start.milliseconds : range.start.milliseconds + (tickDistanceMs - (range.start.milliseconds  % tickDistanceMs));
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
        const { visibleRange } = editor;
        const { width } = editor.frame;
        const startMS = visibleRange.start.milliseconds;

        const tickValues = this.getTickValues(visibleRange);
        const tickWidth = width / tickValues.length;
        const startOffsetMS = tickValues[0] - startMS;
        const offsetPx = tickWidth * (startOffsetMS / 300000);

        for(let i = 0; i < tickValues.length; i += 1) {
            const millisecond = tickValues[i];
            const evenHalfSecond = (millisecond % 500) === 0;
            const evenSecond = (millisecond % 1000) === 0;
            const indicatorClassName = evenSecond ? 'tick-indicator--second' : '';
            const translateX = offsetPx + (tickWidth * i);
            this.ticks.push({
                renderLabel: evenHalfSecond,
                time: new Time(millisecond),
                style: `transform: translateX(${translateX}px)`,
                indicatorClassName: `tick-indicator ${indicatorClassName}`,
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
        const time = this.editor.pixelToTime(evt.dx);
        const updated = new Time(this.editor.visibleRange.start.milliseconds - time.milliseconds);
        if (updated.milliseconds < 0) {
            return setVisibleRangeStart(new Time(0));
        }
        setVisibleRangeStart(updated);
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
