import { LightningElement, wire } from 'lwc';
import { Time } from '../../util/time';
import { wireSymbol } from 'store/index';
import { EditorState } from 'store/editor/reducer';
import { timeToPixel } from 'util/geometry';

export type TimelineMouseEnterEvent = CustomEvent<{}>;
export type TimelineMouseLeaveEvent = CustomEvent<{}>;
export type TimelineDragEvent = CustomEvent<{
    dx: number;
}>;
export type TimelineDragStartEvent = CustomEvent<{}>;
export type TimelineDragEndEvent = CustomEvent<{}>;


function getGridTimes(range, tickDistanceMs) {
    const remainder = (range.start.milliseconds % tickDistanceMs);
    const lower = remainder === 0 ? range.start.milliseconds : range.start.milliseconds + (tickDistanceMs - (range.start.milliseconds  % tickDistanceMs));
    const upper = Math.floor(range.start.milliseconds + range.duration.milliseconds);
    const numberOfTicks = (upper - lower) / tickDistanceMs;
    const values: Time[] = [];
    for(let i = 0; i < numberOfTicks; i += 1) {
        const time = new Time(lower + (i * tickDistanceMs));
        values.push(time);
    }
    return values;
}

function gridLines(editor: EditorState) {
    const { visibleRange, quanitization } = editor;
    const tickDistanceMs = 1000 * quanitization;
    const ticks: Array<{ time: Time, style: string }> = [];

    const times = getGridTimes(visibleRange, tickDistanceMs);
    for(let i = 0, len = times.length; i < len; i += 1) {
        const time = times[i];
        const translateX = timeToPixel(editor.frame!, editor.visibleRange, time);
        ticks.push({
            time,
            style: `transform: translateX(${translateX}px)`,
        });
    }

    return ticks;
}

export default class Grid extends LightningElement {
    @wire(wireSymbol, {
        paths: {
            editor: ['editor']
        }
    })
    reduxData: {
        data: {
            editor: EditorState;
        }
    };

    get gridLines() {
        const { editor } = this.reduxData.data;
        if (!editor.frame) {
            return [];
        }

        return gridLines(editor);
    }

    /*
     *
     * Events
     *
     */
    onTimelineMouseEnter(evt) {
        const event: TimelineMouseEnterEvent = new CustomEvent('timelinemouseenter', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    onTimelineMouseLeave(evt) {
        const event: TimelineMouseLeaveEvent = new CustomEvent('timelinemouseleave', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    onTimelineDrag(evt) {
        const event: TimelineDragEvent = new CustomEvent('timelinedrag', {
            bubbles: true,
            composed: true,
            detail: {
                dx: evt.detail.dx,
            }
        });
        this.dispatchEvent(event);
    }

    onTimelineDragStart(evt) {
        const event: TimelineDragStartEvent = new CustomEvent('timelinedragstart', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    onTimelineDragEnd(evt) {
        const event: TimelineDragEndEvent = new CustomEvent('timelinedragend', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
}
