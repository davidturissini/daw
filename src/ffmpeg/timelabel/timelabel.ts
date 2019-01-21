import { LightningElement, api } from 'lwc';
import parseMs from 'parse-ms';
import padStart from 'lodash.padstart';
import padEnd from 'lodash.padend';
import TimeFormat from 'hh-mm-ss';

export default class TimeLabel extends LightningElement {
    @api time;
    @api format = 'mm:ss';

    get formatted() {
        return TimeFormat.fromMs(this.time.milliseconds, this.format);
    }
}
