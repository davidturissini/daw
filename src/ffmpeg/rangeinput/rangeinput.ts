import { LightningElement, api } from 'lwc';

export enum RangeInputOrienation {
    Horizontal, Vertical
}

export default class RangeInput extends LightningElement {
    @api value: number | string;
    @api step: number | string;
    @api min: number | string;
    @api max: number | string;
    @api orientation: RangeInputOrienation = RangeInputOrienation.Horizontal;

    onInput(evt) {
        const event = new CustomEvent('input', {
            bubbles: true,
            composed: true,
            detail: {
                value: evt.target.value
            }
        });
        this.dispatchEvent(event);
    }
}
