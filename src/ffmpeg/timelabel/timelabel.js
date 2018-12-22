import { LightningElement, api } from 'lwc';
import parseMs from 'parse-ms';

export default class TimeLabel extends LightningElement {
    @api time;

    get formatted() {
        const { milliseconds: timeMilliseconds } = this.time;

        const { hours, minutes, seconds, milliseconds } = parseMs(timeMilliseconds);
        const str = `${minutes}:${seconds}:${milliseconds / 1000}`;

        if (hours > 0) {
            return `${hours}:${str}`;
        }
        return str;
    }
}
