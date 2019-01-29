import { LightningElement, api } from 'lwc';
import interact from 'interactjs';
import { timeToPixel } from 'util/geometry';
import { Time } from 'util/time';
import { AudioWindow } from 'store/audiowindow';

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

    onCaretDrag = (evt) => {
        const event = new CustomEvent('cursordrag', {
            bubbles: true,
            composed: true,
            detail: {
                dx: evt.dx,
            },
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
                onmove: this.onCaretDrag
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
