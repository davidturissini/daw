import { LightningElement, wire, api } from 'lwc';
import { editorSym } from './../../wire/editor';
import interact from 'interactjs';

export default class Cursor extends LightningElement {
    @api virtual;
    @api playhead;
    @api userDrag;

    interact;

    /*
     *
     * Editor
     *
    */
    @wire(editorSym, {})
    editor;

    @api time;

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

    /*
     *
     * Lifecycle
     *
    */
    renderedCallback() {
        if (this.userDrag && !this.interact) {
            this.interact = interact(this.template.querySelector('.drag-triangle')).draggable({
                onmove: this.onCaretDrag
            });
        }
    }
}
