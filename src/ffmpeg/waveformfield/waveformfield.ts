import { LightningElement, api } from 'lwc';
import { ButtonGroupButton, ButtonGroupValueChangeEvent } from 'cmp/buttongroup/buttongroup';
import { waveformChangeEvent } from 'event/waveformchangeevent';

export enum WaveformTypes {
    sine = 'sine',
    square = 'square',
    triangle = 'triangle',
    sawtooth = 'sawtooth',
}

export default class OscillatorField extends LightningElement {
    @api value: WaveformTypes;
    get waveformButtons(): ButtonGroupButton<WaveformTypes>[] {
        return [{
            value: WaveformTypes.sine,
            text: 'Sine',
            key: WaveformTypes.sine,
        },{
            value: WaveformTypes.square,
            text: 'Square',
            key: WaveformTypes.square,
        },{
            value: WaveformTypes.triangle,
            text: 'Triangle',
            key: WaveformTypes.triangle,
        },{
            value: WaveformTypes.sawtooth,
            text: 'Sawtooth',
            key: WaveformTypes.sawtooth,
        }]
    }

    onWaveformChange(evt: ButtonGroupValueChangeEvent<WaveformTypes>) {
        const event = waveformChangeEvent(evt.detail.value);
        this.dispatchEvent(event);
    }

}
