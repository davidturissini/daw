import { LightningElement, wire, api } from 'lwc';
import { editorSym } from './../../wire/editor';

export default class Cursor extends LightningElement {
    @api virtual;
    @api playhead;

    /*
     *
     * Editor
     *
    */
    @wire(editorSym, {})
    editor;

    @api time;

    get lineStyle() {
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
}
