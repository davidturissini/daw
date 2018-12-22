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
   editorWireCallback(editor) {
        if (!editor.data.frame) {
            return;
        }
        const { host } = this.template;
        const cursorData = this.virtual ? editor.data.virtualCursor : editor.data.cursor;
        if (cursorData) {
            const px = editor.data.timeToPixel(cursorData);
            host.style.transform = `translateX(${px}px)`;
        }
   }

   /*
     *
     * Editor
     *
    */
    connectedCallback() {
        if (this.virtual) {
            this.template.host.classList.add('cursor--virtual');
        }
    }
}
