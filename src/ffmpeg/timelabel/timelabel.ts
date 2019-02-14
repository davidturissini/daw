import { LightningElement, api } from 'lwc';
import { Tempo } from 'store/project';
import { Tick, ONE_BEAT, QUARTER_BEAT } from 'store/tick';

export enum TimeLabelAlign {
    LEFT, CENTER, RIGHT,
}

export default class TimeLabel extends LightningElement {
    @api format = 'mm:ss';
    @api isBeat: boolean = false;
    @api tempo: Tempo;
    @api tick: Tick;
    @api align: TimeLabelAlign = TimeLabelAlign.LEFT;

    get className(): string | undefined {
        const { align } = this;
        if (align === TimeLabelAlign.CENTER) {
            return 'center';
        }

        if (align === TimeLabelAlign.RIGHT) {
            return 'right';
        }
    }

    get formatted() {
        const resolutionIndex = Math.floor(this.tick.index / ONE_BEAT.index);
        const remainder = (this.tick.index % ONE_BEAT.index) / QUARTER_BEAT.index;
        return `${resolutionIndex + 1}.${remainder + 1}`;
    }
}
