import { LightningElement, api } from 'lwc';
import { AudioRange, BeatRange } from 'util/audiorange';
import { Color } from 'util/color';
import { AudioRangeElementChange } from 'cmp/audiowindow/audiowindow';

const rangeSymbol = Symbol();

export default class AudioRangeElement extends LightningElement {
    @api color: Color | null = null;
    @api itemId: string;

    connected = false;
    @api
    set range(value: AudioRange | BeatRange) {
        if (this.connected === true) {
            const event: AudioRangeElementChange = new CustomEvent('rangechange', {
                bubbles: true,
                composed: true,
                detail: {
                    range: value,
                }
            });
            this.dispatchEvent(event);
        }
        this[rangeSymbol] = value;
    }

    get range() {
        return this[rangeSymbol];
    }

    get containerStyle() {
        const color = this.color || new Color(0, 255, 0);
        return `background: ${color.rgb()}`;
    }

    /*
     *
     *
     * Lifecycle
     *
     *
    */
    connectedCallback() {
        this.connected = true;
    }

    disconnectedCallback() {
        this.connected = false;
    }
}
