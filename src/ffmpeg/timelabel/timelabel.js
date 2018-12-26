import { LightningElement, api } from 'lwc';
import parseMs from 'parse-ms';
import padStart from 'lodash.padstart';
import padEnd from 'lodash.padend';

export default class TimeLabel extends LightningElement {
    @api time;

    get formatted() {
        const { milliseconds: timeMilliseconds } = this.time;

        const { hours, minutes, seconds, milliseconds } = parseMs(timeMilliseconds);
        const millisecondsString = padEnd(milliseconds / 1000, 3, '0');
        let str = `${padStart(seconds, 2, '0')}`;

        if (minutes > 0) {
            str = `${padStart(minutes, 2, '0')}:${str}`;
        }

        if (hours > 0) {
            return `${hours}:${str}`;
        }
        return str;
    }
}
