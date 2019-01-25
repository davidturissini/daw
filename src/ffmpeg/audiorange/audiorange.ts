import { LightningElement, api } from 'lwc';
import { AudioRange } from 'util/audiorange';
import { Frame, timeToPixel, durationToWidth, pixelToTime } from 'util/geometry';
import { Color } from 'util/color';
import interact, { Interactable } from 'interactjs';
import rafThrottle from 'raf-throttle';
import { Time } from 'util/time';
import { GridElementRow } from 'cmp/grid/grid';

interface AudioWindow {
    frame: Frame;
    visibleRange: AudioRange;
}

export type RangeDragStartEvent = CustomEvent<{
    itemId: string;
}>;
export type RangeDragEvent = CustomEvent<{
    time: Time;
    itemId: string;
}>;
export type RangeDragEndEvent = CustomEvent<{}>;
export type RangeDoubleClickEvent = CustomEvent<{}>;

export type RangeSourceOffsetChangeEvent = CustomEvent<{
    time: Time;
    itemId: string;
}>;
export type RangeDurationChangeEvent = CustomEvent<{
    time: Time;
    itemId: string;
}>;


function calcStyle(audioWindow: AudioWindow, range: AudioRange, rows: GridElementRow[], rowIndex: number, color: Color) {
    const { frame, visibleRange } = audioWindow;
    const frameWidth = frame.width;
    const segmentOffset = timeToPixel(frame, visibleRange, range.start);
    let width = durationToWidth(frame, visibleRange, range.duration);

    let y = 0;
    for(let i = 0; i < rowIndex; i += 1) {
        y += rows[i].height;
    }

    const x = segmentOffset;
    if (x < 0) {
        width += x;
    }

    if (width + x > frameWidth) {
        const diff = (width + x) - frameWidth;
        width = width - diff;
    }
    return {
        transform: `translate3d(${Math.max(x, 0)}px, ${y}px, 0)`,
        width: `${width}px`,
        height: rows[rowIndex].height,
        background: color.rgb(),
    };
}

export default class AudioRangeElement extends LightningElement {
    @api rowIndex: number;
    @api rows: GridElementRow[];
    @api range: AudioRange;
    @api color: Color;
    @api audioWindow: AudioWindow;
    @api itemId: string;

    moveInteract: Interactable | null = null;
    startHandleIneract: Interactable | null = null;
    endHandleInteract: Interactable | null = null;
    doubleClickInteract: Interactable | null = null;

    /*
     *
     *
     * Events
     *
     *
    */
    onStartDrag = (evt) => {
        const event: RangeDragStartEvent = new CustomEvent('rangedragstart', {
            composed: true,
            bubbles: true,
            detail: {
                itemId: this.itemId,
            }
        });

        this.dispatchEvent(event);
    }

    onDrag = rafThrottle((evt) => {
        const { audioWindow, itemId } = this;
        const { dx } = evt;
        const time = pixelToTime(audioWindow.frame, audioWindow.visibleRange, dx);
        const event: RangeDragEvent = new CustomEvent('rangedrag', {
            composed: true,
            bubbles: true,
            detail: {
                time,
                itemId,
            }
        });

        this.dispatchEvent(event);
    })

    onEndDrag = (evt) => {
        const event: RangeDragEndEvent = new CustomEvent('rangedragend', {
            composed: true,
            bubbles: true,
        });

        this.dispatchEvent(event);
    }

    onDoubleTap = (evt) => {
        const event: RangeDoubleClickEvent = new CustomEvent('rangedoubleclick', {
            composed: true,
            bubbles: true,
        });

        this.dispatchEvent(event);
    }

    onStartHandleDrag = rafThrottle((evt) => {
        const { audioWindow, itemId } = this;
        const { dx } = evt;
        const time = pixelToTime(audioWindow.frame, audioWindow.visibleRange, dx);
        const event: RangeSourceOffsetChangeEvent = new CustomEvent('rangesourceoffsetchange', {
            composed: true,
            bubbles: true,
            detail: {
                time,
                itemId,
            }
        });

        this.dispatchEvent(event);
    })

    onEndHandleDrag = rafThrottle((evt) => {
        const { audioWindow, itemId } = this;
        const { dx } = evt;
        const time = pixelToTime(audioWindow.frame, audioWindow.visibleRange, dx);
        const event: RangeDurationChangeEvent = new CustomEvent('rangedurationchange', {
            composed: true,
            bubbles: true,
            detail: {
                time,
                itemId,
            }
        });

        this.dispatchEvent(event);
    })

    get divStyle(): string {
        const obj = calcStyle(this.audioWindow, this.range, this.rows, this.rowIndex, this.color);
        return `transform:${obj.transform};width:${obj.width};height:${obj.height}px;background:${obj.background}`;
    }

    /*
     *
     *
     * Lifecycle
     *
     *
    */
    connectedCallback() {
        this.moveInteract = interact(this.template.host).draggable({
            inertia: false,
            axis: 'y',
            onmove: this.onDrag,
            onstart: this.onStartDrag,
            onend: this.onEndDrag,
        });

        this.doubleClickInteract = interact(this.template.host).on('doubletap', this.onDoubleTap);
    }

    renderedCallback() {
        if (!this.startHandleIneract) {
            this.startHandleIneract = interact(this.template.querySelector('.handle--start'))
                .draggable({
                    inertia: false,
                    axis: 'x',
                    onmove: this.onStartHandleDrag,
                })
        }

        if (!this.endHandleInteract) {
            this.endHandleInteract = interact(this.template.querySelector('.handle--end'))
                .draggable({
                    inertia: false,
                    axis: 'x',
                    onmove: this.onEndHandleDrag,
                })
        }
    }

    disconnectedCallback() {
        if (this.startHandleIneract) {
            (this.startHandleIneract as any).unset();
        }

        if (this.endHandleInteract) {
            (this.endHandleInteract as any).unset();
        }

        if (this.moveInteract) {
            (this.moveInteract as any).unset();
        }

        if (this.doubleClickInteract) {
            (this.doubleClickInteract as any).unset();
        }

        this.moveInteract = null;
        this.startHandleIneract = null;
        this.endHandleInteract = null;
    }
}
