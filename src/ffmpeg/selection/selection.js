import { LightningElement, api, wire } from 'lwc';
import { selectionSym } from './../../wire/selection';

export default class Selection extends LightningElement {
    @wire(selectionSym, {})
    selection

    get rectStyle() {
        if (!this.selection.data) {
            return '';
        }

        const { width, height, left, top } = this.selection.data.frame;
        return `transform: translate(${left}px, ${top}px); width:${width}px; height: ${height}px`;
    }
}
