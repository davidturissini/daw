import { LightningElement, api } from 'lwc';

const heightSym = Symbol();

export default class GridRowElement extends LightningElement {
    @api
    set height(value: number) {
        if (this.template.host) {
            this.template.host.style.height = value + 'px';
        }
        this[heightSym] = value;
    }

    get height() {
        return this[heightSym];
    }
}
