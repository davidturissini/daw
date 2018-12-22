import { LightningElement, api, track } from 'lwc';

export default class Busy extends LightningElement {
    @api message;
    @track elipses = '';

    drawElipses = () => {
        this.timeout = setTimeout(() => {
            if (this.elipses === '...') {
                this.elipses = '';
            } else {
                this.elipses += '.';
            }
            this.drawElipses();
        }, 200);
    }

    connectedCallback() {
        this.drawElipses();
    }

    disconnectedCallback() {
        clearTimeout(this.timeout);
    }

}
