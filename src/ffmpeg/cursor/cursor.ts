import { LightningElement, api } from 'lwc';
import { Time } from 'util/time';
import { TimeChangeEvent } from 'cmp/audiowindow/audiowindow';
import { Color } from 'util/color';

const timeSymbol = Symbol();

export default class CursorElement extends LightningElement {
    @api dashed: boolean = false;
    @api color: Color | null = null;
    connected = false;
    [timeSymbol]: Time;

    @api
    set time(value: Time) {
        if (this.connected === true) {
            const event: TimeChangeEvent = new CustomEvent('timechange', {
                bubbles: true,
                composed: true,
                detail: {
                    time: value,
                }
            });
            this.dispatchEvent(event);
        }
        this[timeSymbol] = value;
    }

    get time() {
        return this[timeSymbol];
    }

    get lineClassName() {
        let base = 'line'
        if (this.dashed) {
            return `${base} line--dashed`;
        }
        return base;
    }

    get lineStyles() {
        const color = this.color || new Color(117, 117, 117);
        return `border-color: ${color.rgb()}`;
    }

    /*
     *
     * Lifecycle
     *
    */
    connectedCallback() {
        this.connected = true;
    }

    disconnectedCallback() {
        this.connected = false;
    }
}
