import { LightningElement, api } from 'lwc';
import { ButtonGroupButton, ButtonGroupValueChangeEvent } from 'cmp/buttongroup/buttongroup';
import { FilterType, FilterRolloff } from 'tone';
import { filterChangedEvent, FilterChangedEvent } from 'event/filtertypechangevent';

export default class FilterField extends LightningElement {
    @api type: FilterType;
    @api q: number;
    @api rolloff: FilterRolloff;

    get filterRolloffButtons(): ButtonGroupButton<FilterRolloff>[] {
        return [{
            value: -12,
            key: -12,
            text: '-12'
        },{
            value: -24,
            key: -24,
            text: '-24'
        },{
            value: -48,
            key: -48,
            text: '-48'
        },{
            value: -96,
            key: -96,
            text: '-96'
        }]
    }

    get filterTypes(): ButtonGroupButton<FilterType>[] {
        return [{
            value: 'lowpass',
            key: 'lowpass',
            text: 'lowpass'
        },{
            value: 'highpass',
            key: 'highpass',
            text: 'highpass'
        },{
            value: 'bandpass',
            key: 'bandpass',
            text: 'bandpass'
        },{
            value: 'lowshelf',
            key: 'lowshelf',
            text: 'lowshelf'
        },{
            value: 'highshelf',
            key: 'highshelf',
            text: 'highshelf'
        },{
            value: 'notch',
            key: 'notch',
            text: 'notch'
        },{
            value: 'allpass',
            key: 'allpass',
            text: 'allpass'
        },{
            value: 'peaking',
            key: 'peaking',
            text: 'peaking'
        }]
    }

    onFilterTypeChange(evt: ButtonGroupValueChangeEvent<FilterType>) {
        const event: FilterChangedEvent = filterChangedEvent(evt.detail.value, this.q, this.rolloff);
        this.dispatchEvent(event);
    }

    onRolloffChange(evt: ButtonGroupValueChangeEvent<FilterRolloff>) {
        const event: FilterChangedEvent = filterChangedEvent(this.type, this.q, evt.detail.value);
        this.dispatchEvent(event);
    }

    onQChange(evt) {
        const event: FilterChangedEvent = filterChangedEvent(this.type, parseInt(evt.target.value, 10), this.rolloff);
        this.dispatchEvent(event);
    }
}
