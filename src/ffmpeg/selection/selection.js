import { LightningElement, api } from 'lwc';

export default class Selection extends LightningElement {
    @api frame;

    get rectStyle() {
        const { width, height, left, top } = this.frame;
        const translate = `translate(${left}px, ${top}px) scale(${width}, ${height})`;
        return `transform: ${translate}`;
    }
}
