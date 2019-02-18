import { LightningElement, api, wire } from 'lwc';
import { wireSymbol, appStore } from 'store/index';
import { InstrumentState } from 'store/instrument/reducer';
import { Instrument } from 'store/instrument';
import { InstrumentType } from 'store/instrument/types';
import { setInstrumentData } from 'store/instrument/action';
import { EnvelopeValueChangeEvent } from 'cmp/envelopefield/envelopefield';
import { ButtonGroupButton, ButtonGroupValueChangeEvent } from 'cmp/buttongroup/buttongroup';
import { AttackReleaseCurve } from 'store/instrument/nodes/DrumMachine';

enum WaveformTypes {
    sine = 'sine',
    square = 'square',
    triangle = 'triangle',
    sawtooth = 'sawtooth',
}

export default class InstrumentEditorElement extends LightningElement {
    @api instrumentId: string;

    @wire(wireSymbol, {
        paths: {
            instruments: ['instrument', 'items']
        }
    })
    storeData: {
        data: {
            instruments: InstrumentState['items'];
        }
    }

    get instrument() {
        return this.storeData.data.instruments.get(this.instrumentId) as Instrument<any>;
    }

    get instrumentIsSynth() {
        return this.instrument.type === InstrumentType.Synth;
    }

    get instrumentIsDrumMachine() {
        return this.instrument.type === InstrumentType.DrumMachine;
    }

    get instrumentData() {
        return this.instrument.data;
    }

    get attackReleaseCurveButtons(): ButtonGroupButton<AttackReleaseCurve>[] {
        return [{
            value: AttackReleaseCurve.exponential,
            text: 'Exponential',
            key: AttackReleaseCurve.exponential
        },{
            value: AttackReleaseCurve.linear,
            text: 'Linear',
            key: AttackReleaseCurve.linear
        }]
    }

    get waveformButtons(): ButtonGroupButton<WaveformTypes>[] {
        return [{
            value: WaveformTypes.sine,
            iconVariant: 'Drum',
            key: WaveformTypes.sine,
        },{
            value: WaveformTypes.square,
            iconVariant: 'Drum',
            key: WaveformTypes.square,
        },{
            value: WaveformTypes.triangle,
            iconVariant: 'Drum',
            key: WaveformTypes.triangle,
        },{
            value: WaveformTypes.sawtooth,
            iconVariant: 'Drum',
            key: WaveformTypes.sawtooth,
        }]
    }

    onSynthEnvelopeValueChange(evt: EnvelopeValueChangeEvent) {
        const data = this.instrument.data.set(evt.detail.type, evt.detail.value);
        appStore.dispatch(
            setInstrumentData(this.instrumentId, data)
        )
    }

    onWaveChangeInput(evt: ButtonGroupValueChangeEvent<WaveformTypes>) {
        const { value } = evt.detail;
        const data = this.instrument.data.set('oscillatorType', value);
        appStore.dispatch(
            setInstrumentData(this.instrumentId, data)
        )
    }

    onAttackReleaseCurveChange(evt: ButtonGroupValueChangeEvent<AttackReleaseCurve>) {
        const { value } = evt.detail;
        const data = this.instrument.data.set('curve', value);
        appStore.dispatch(
            setInstrumentData(this.instrumentId, data)
        )
    }

    get drumMachineEnvelopeFields() {
        return ['attack', 'release'];
    }
}
