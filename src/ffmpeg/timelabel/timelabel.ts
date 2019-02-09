import { LightningElement, api } from 'lwc';
import TimeFormat from 'hh-mm-ss';
import { Time, timeToBeat } from 'util/time';
import { Tempo } from 'store/project';

export default class TimeLabel extends LightningElement {
    @api time: Time;
    @api format = 'mm:ss';
    @api isBeat: boolean = false;
    @api tempo: Tempo | null = null;

    get formatted() {
        const { tempo } = this;
        if (this.isBeat && tempo) {
            return timeToBeat(this.time, tempo).index * 4;
        }
        return TimeFormat.fromMs(this.time.milliseconds, this.format);
    }
}
