import { LightningElement, wire } from 'lwc';
import { editorSym } from '../../wire/editor';
import { Time } from '../../util/time';

function getGridTimes(range, tickDistanceMs) {
    const remainder = (range.start.milliseconds % tickDistanceMs);
    const lower = remainder === 0 ? range.start.milliseconds : range.start.milliseconds + (tickDistanceMs - (range.start.milliseconds  % tickDistanceMs));
    const upper = Math.floor(range.start.milliseconds + range.duration.milliseconds);
    const numberOfTicks = (upper - lower) / tickDistanceMs;
    const values = [];
    for(let i = 0; i < numberOfTicks; i += 1) {
        const time = new Time(lower + (i * tickDistanceMs));
        values.push(time);
    }
    return values;
}

function gridLines(editor) {
    const { visibleRange, quanitization } = editor;
    const tickDistanceMs = 1000 * quanitization;
    const ticks = [];

    const times = getGridTimes(visibleRange, tickDistanceMs);
    for(let i = 0, len = times.length; i < len; i += 1) {
        const time = times[i];
        const translateX = editor.timeToPixel(time)
        ticks.push({
            time,
            style: `transform: translateX(${translateX}px)`,
        });
    }

    return ticks;
}

export default class Grid extends LightningElement {
    @wire(editorSym, {})
    editor;

    get gridLines() {
        const { editor } = this;
        if (!editor.data.frame) {
            return [];
        }

        return gridLines(editor.data);
    }
}
