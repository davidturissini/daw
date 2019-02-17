import { LightningElement, api } from 'lwc';
import { Decibel, decibel } from 'units/decibel';

export default class VolumeMeter extends LightningElement {
    @api meter: Decibel = decibel(-100);

    get totalScaleValue(): number {
        const { meter } = this;
        const { value: meterValue } = meter;
        const min = -100;
        let y = 1 - (meterValue / -100);

        if (meterValue <= min) {
            y = 0;
        }

        return y;
    }

    get indicatorStyle() {
        const { meter } = this;
        const { value: meterValue } = meter;
        const min = -100;
        const max = 0;
        let y = 1 - (meterValue / -100);

        if (meterValue >= max) {
            y = 1;
        } else if (meterValue <= min) {
            y = 0;
        }

        return `transform: scale(1, ${y})`
    }

    get greenStyle() {
        const { totalScaleValue } = this;
        const max = 0.6;
        let y = 1;
        if (totalScaleValue < max) {
            y = totalScaleValue / 0.6;
        }
        return `transform: scale(1, ${y})`;
    }

    get yellowStyle() {
        const { totalScaleValue } = this;
        const min = 0.6;
        const max = 1;
        let y = 1;
        if (totalScaleValue < min) {
            y = 0;
        } else if (totalScaleValue > min && totalScaleValue < max) {
            y = (totalScaleValue - min) / (max - min)
        }
        return `transform: scale(1, ${y})`;
    }

    get redStyle() {
        const { totalScaleValue } = this;
        const min = 1;
        const max = 50;
        let y = 1;
        if (totalScaleValue < min) {
            y = 0;
        } else if (totalScaleValue > min && totalScaleValue < max) {
            y = (totalScaleValue - min) / (max - min)
        }
        return `transform: scale(1, ${y})`;
    }
}
