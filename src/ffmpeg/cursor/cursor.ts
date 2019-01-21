import { LightningElement, wire, api } from 'lwc';
import { wireSymbol } from 'store/index';
import interact from 'interactjs';
import { EditorState } from 'store/editor/reducer';
import { timeToPixel } from 'util/geometry';
import { Time } from 'util/time';

export default class Cursor extends LightningElement {
    @api virtual;
    @api playhead;
    @api userDrag;
    @api time: Time;

    interact: any;

    /*
     *
     * Editor
     *
    */
    @wire(wireSymbol, {
        paths: {
            editor: ['editor']
        }
    })
    reduxData: {
        data: {
            editor: EditorState;
        }
    }

    get containerStyle() {
        const { editor } = this.reduxData.data
        if (!editor.frame) {
            return '';
        }

        const px = timeToPixel(editor.frame, editor.visibleRange, this.time);
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
