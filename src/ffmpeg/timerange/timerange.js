import { LightningElement, api, wire } from 'lwc';
import { editorSym } from './../../wire/editor';

export default class TimeRange extends LightningElement {
    @api range;

    @wire(editorSym, {})
    editor;

    get divStyle() {
        const width = this.editor.data.durationToWidth(this.range.duration);
        const x = this.editor.data.timeToPixel(this.range.start);
        return `width:${width}px;transform:translateX(${x}px)`;
    }
}
