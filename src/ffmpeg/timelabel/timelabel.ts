import { LightningElement, api } from 'lwc';
import TimeFormat from 'hh-mm-ss';
import { Time, timeToBeat } from 'util/time';
import { Tempo } from 'store/project';
import { TimeChangeEvent } from 'cmp/audiowindow/audiowindow';

const timeSymbol = Symbol();

export default class TimeLabel extends LightningElement {
    @api format = 'mm:ss';
    @api isBeat: boolean = false;
    @api tempo: Tempo | null = null;
    connected: boolean = false;
    [timeSymbol]: Time;

    @api
    set time(value) {
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

    get formatted() {
        const { tempo } = this;
        if (this.isBeat && tempo) {
            return timeToBeat(this.time, tempo).index * 4 + 1;
        }
        return TimeFormat.fromMs(this.time.milliseconds, this.format);
    }

    connectedCallback() {
        this.connected = true;
    }

    disconnectedCallback() {
        this.connected = false;
    }
}
