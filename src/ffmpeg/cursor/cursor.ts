import { LightningElement, api } from 'lwc';
import interact from 'interactjs';
import { timeToPixel, pixelToTime } from 'util/geometry';
import { Time } from 'util/time';
import { AudioWindow, quanitizeTime } from 'store/audiowindow';

export type CursorDragStartEvent = CustomEvent<{
    time: Time,
}>

export type CursorDragEvent = CustomEvent<{
    time: Time,
}>

export type CursorDragEndEvent = CustomEvent<{}>


export default class CursorElement extends LightningElement {
    @api virtual: boolean = false;
    @api userDrag;
    @api time: Time;
    @api audioWindow: AudioWindow;

    interact: any;

    get containerStyle() {
        const { audioWindow } = this;
        const px = timeToPixel(audioWindow.frame, audioWindow.visibleRange, this.time);
        return `transform: translateX(${px}px)`;
    }

    get lineClassName() {
        let base = 'line'
        if (this.virtual) {
            return `${base} line--virtual`;
        }
        return base;
    }

    onStartDrag = (evt) => {
        const event: CursorDragStartEvent = new CustomEvent('cursordragstart', {
            bubbles: true,
            composed: true,
            detail: {
                time: this.time,
            }
        });

        this.dispatchEvent(event);
    }

    onCaretDrag = (evt) => {
        const { audioWindow } = this;
        const time = pixelToTime(audioWindow.rect, audioWindow.visibleRange, evt.dx);
        const event: CursorDragEvent = new CustomEvent('cursordrag', {
            bubbles: true,
            composed: true,
            detail: {
                time,
            },
        });
        this.dispatchEvent(event);
    }

    onEndDrag = (evt) => {
        const event: CursorDragEndEvent = new CustomEvent('cursordragend', {
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(event);
    }

    onCaretDoubleTap = (evt) => {
        const event = new CustomEvent('cursordoubletap', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    /*
     *
     * Lifecycle
     *
    */
    renderedCallback() {
        if (this.userDrag && !this.interact) {
            this.interact = interact(this.template.querySelector('.drag-triangle'));

            this.interact.draggable({
                onmove: this.onCaretDrag,
                onstart: this.onStartDrag,
                onend: this.onEndDrag,
            });

            this.interact.on('doubletap', this.onCaretDoubleTap);
        }
    }

    disconnectedCallback() {
        if (this.interact) {
            this.interact.unset();
            this.interact.off('doubletap', this.onCaretDoubleTap);
        }
    }
}
