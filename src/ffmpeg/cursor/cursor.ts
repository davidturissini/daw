import { LightningElement, wire, api } from 'lwc';
import { editorSym } from '../../wire/editor';
import interact from 'interactjs';

export default class Cursor extends LightningElement {
    @api virtual;
    @api playhead;
    @api userDrag;
    @api time;

    interact;

    /*
     *
     * Editor
     *
    */
    @wire(editorSym, {})
    editor;

    get containerStyle() {
        const { editor } = this;
        if (!editor.data.frame) {
            return '';
        }

        const px = editor.data.timeToPixel(this.time);
        return `transform: translateX(${px}px)`;
    }

    get lineClassName() {
        let base = 'line'
        if (this.virtual) {
            return `${base} line--virtual`;
        }
        if (this.playhead) {
            return `${base} line--playhead`;
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
