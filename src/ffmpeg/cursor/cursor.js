import { LightningElement, wire, api } from 'lwc';
import { editorSym } from './../../wire/editor';

export default class Cursor extends LightningElement {
    @api virtual;

    /*
     *
     * Editor
     *
    */
    @wire(editorSym, {})
    editor;

    @api
    get time() {

    }

    set time(value) {
        const { editor } = this;
        if (!editor.data.frame) {
            return;
        }
        const { host } = this.template;
        if (value) {
            const px = editor.data.timeToPixel(value);
            host.style.transform = `translateX(${px}px)`;
        }
    }

    /*
     *
     * Lifecycle
     *
    */
    connectedCallback() {
        if (this.virtual) {
            this.template.host.classList.add('cursor--virtual');
        }
    }
}
