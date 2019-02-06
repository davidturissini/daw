import { LightningElement, api } from 'lwc';
import interact from 'interactjs';
import { Time } from 'util/time';
import { TimeChangeEvent } from 'cmp/audiowindow/audiowindow';

export type CursorDragStartEvent = CustomEvent<{
    time: Time,
}>

export type CursorDragEvent = CustomEvent<{
    time: Time,
}>

export type CursorDragEndEvent = CustomEvent<{}>

const timeSymbol = Symbol();


export default class CursorElement extends LightningElement {
    @api virtual: boolean = false;
    @api userDrag;
    connected = false;
    interact: any;
    [timeSymbol]: Time;

    @api
    set time(value: Time) {
        if (this.connected === true) {
            const event: TimeChangeEvent = new CustomEvent('timechange', {
                bubbles: true,
                composed: true,
                detail: {
                    time: value,
                }
            });
            this.dispatchEvent(event);
        }
        this[timeSymbol] = value;
    }

    get time() {
        return this[timeSymbol];
    }

    get lineClassName() {
        let base = 'line'
        if (this.virtual) {
            return `${base} line--virtual`;
        }
        return base;
    }

    onStartDrag = (evt) => {
        const { time } = this;
        if (!time) {
            return;
        }
        const event: CursorDragStartEvent = new CustomEvent('cursordragstart', {
            bubbles: true,
            composed: true,
            detail: {
                time,
            }
        });

        this.dispatchEvent(event);
    }

    onCaretDrag = (evt) => {
        // const time = pixelToTime(audioWindow.rect, audioWindow.visibleRange, evt.dx);
        // const event: CursorDragEvent = new CustomEvent('cursordrag', {
        //     bubbles: true,
        //     composed: true,
        //     detail: {
        //         time,
        //     },
        // });
        // this.dispatchEvent(event);
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

    connectedCallback() {
        this.connected = true;
    }

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
        this.connected = false;
        if (this.interact) {
            this.interact.unset();
            this.interact.off('doubletap', this.onCaretDoubleTap);
        }
    }
}
