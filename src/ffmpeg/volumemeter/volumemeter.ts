import { LightningElement, api } from 'lwc';
import { Decibel, decibel } from 'units/decibel';

export enum VolumeMeterOrientation {
    Horizontal, Vertical
}

export default class VolumeMeter extends LightningElement {
    @api meter: Decibel = decibel(-100);
    @api orientation: VolumeMeterOrientation = VolumeMeterOrientation.Vertical;

    get isHorizontal() {
        return this.orientation === VolumeMeterOrientation.Horizontal;
    }

    get isVertical() {
        return !this.isHorizontal;
    }

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
        let value = 1;
        if (totalScaleValue < max) {
            value = totalScaleValue / 0.6;
        }
        const scale = {
            x: this.isHorizontal ? value : 1,
            y: this.isVertical ? value : 1,
        }
        return `transform: scale(${scale.x}, ${scale.y})`;
    }

    get yellowStyle() {
        const { totalScaleValue } = this;
        const min = 0.6;
        const max = 1;
        let value = 1;
        if (totalScaleValue < min) {
            value = 0;
        } else if (totalScaleValue > min && totalScaleValue < max) {
            value = (totalScaleValue - min) / (max - min)
        }
        const scale = {
            x: this.isHorizontal ? value : 1,
            y: this.isVertical ? value : 1,
        }
        return `transform: scale(${scale.x}, ${scale.y})`;
    }

    get redStyle() {
        const { totalScaleValue } = this;
        const min = 1;
        const max = 50;
        let value = 1;
        if (totalScaleValue < min) {
            value = 0;
        } else if (totalScaleValue > min && totalScaleValue < max) {
            value = (totalScaleValue - min) / (max - min)
        }
        const scale = {
            x: this.isHorizontal ? value : 1,
            y: this.isVertical ? value : 1,
        }
        return `transform: scale(${scale.x}, ${scale.y})`;
    }

    get meterClassName() {
        const className = ['meter'];
        if (this.isHorizontal) {
            className.push('meter--horizontal');
        }

        return className.join(' ');
    }
}
