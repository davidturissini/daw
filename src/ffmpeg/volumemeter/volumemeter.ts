import { LightningElement, api, track } from 'lwc';
import { Decibel, decibel } from 'units/decibel';
import { Meter as ToneMeter } from 'tone';
import { Subscription, Observable, animationFrameScheduler } from 'rxjs';
import { repeat, distinctUntilChanged, filter } from 'rxjs/operators';

export enum VolumeMeterOrientation {
    Horizontal, Vertical
}

export default class VolumeMeter extends LightningElement {
    @api meter: ToneMeter;
    @track decibel: Decibel = decibel(-100);
    @api orientation: VolumeMeterOrientation = VolumeMeterOrientation.Vertical;

    get isHorizontal() {
        return this.orientation === VolumeMeterOrientation.Horizontal;
    }

    get isVertical() {
        return this.orientation === VolumeMeterOrientation.Vertical;
    }

    get totalScaleValue(): number {
        const { decibel } = this;
        const { value: meterValue } = decibel;
        const min = -100;
        let y = 1 - (meterValue / -100);

        if (meterValue <= min) {
            y = 0;
        }

        return y;
    }

    get indicatorStyle() {
        const { decibel } = this;
        const { value: meterValue } = decibel;
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
        const max = 1.1;
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

    buildIndicatorClassName(color: string) {
        const classNames = ['indicator', `indicator--${color}`];
        if (this.isVertical) {
            classNames.push('indicator--vertical');
        }
        return classNames.join(' ');
    }

    get greenIndicatorClassName() {
        return this.buildIndicatorClassName('green');
    }

    get yellowIndicatorClassName() {
        return this.buildIndicatorClassName('yellow');
    }

    get redIndicatorClassName() {
        return this.buildIndicatorClassName('red');
    }

    meterSubscription: Subscription | null = null
    connectMeterSubscription(): Subscription {
        const { meter } = this;
        return Observable.create((o) => {
            animationFrameScheduler.schedule(() => {
                const level = meter.getLevel();
                o.next(decibel(level));
                o.complete();
            });
        })
        .pipe(
            repeat(),
            distinctUntilChanged((x: Decibel, y: Decibel) => x.value === y.value),
            filter((decibelValue: Decibel) => {
                return decibelValue.value > -100;
            })
        )
        .subscribe((decibelValue: Decibel) => {
            this.decibel = decibelValue;
        })
    }

    connectedCallback() {
        this.meterSubscription = this.connectMeterSubscription();
    }

    disconnectedCallback() {
        if (this.meterSubscription) {
            this.meterSubscription.unsubscribe();
        }
    }
}
