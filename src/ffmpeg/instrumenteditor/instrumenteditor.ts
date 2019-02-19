import { LightningElement, api, wire } from 'lwc';
import { wireSymbol, appStore } from 'store/index';
import { InstrumentState } from 'store/instrument/reducer';
import { Instrument } from 'store/instrument';
import { InstrumentType } from 'store/instrument/types';
import { setInstrumentData } from 'store/instrument/action';
import { EnvelopeValueChangeEvent } from 'cmp/envelopefield/envelopefield';
import { ButtonGroupButton, ButtonGroupValueChangeEvent } from 'cmp/buttongroup/buttongroup';
import { AttackReleaseCurve } from 'store/instrument/nodes/DrumMachine';
import { NoiseType } from 'tone';
import { WaveformChangeEvent } from 'event/waveformchangeevent';
import { FilterChangedEvent } from 'event/filtertypechangevent';

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

    get instrumentIsNoiseSynth() {
        return this.instrument.type === InstrumentType.NoiseSynth;
    }

    get instrumentIsFMSynth() {
        return this.instrument.type === InstrumentType.FMSynth;
    }

    get instrumentIsMembraneSynth() {
        return this.instrument.type === InstrumentType.MembraneSynth;
    }

    get instrumentIsAMSynth() {
        return this.instrument.type === InstrumentType.AMSynth;
    }

    get instrumentIsMonoSynth() {
        return this.instrument.type === InstrumentType.MonoSynth;
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

    get fmSynthOscillatorButtons(): ButtonGroupButton<WaveformTypes>[] {
        return this.waveformButtons;
    }

    get noiseSynthNoiseTypes(): ButtonGroupButton<NoiseType>[] {
        return [{
            value: 'white',
            key: 'white',
            text: 'White'
        },{
            value: 'brown',
            key: 'brown',
            text: 'Brown'
        },{
            value: 'pink',
            key: 'pink',
            text: 'Pink'
        }]
    }

    onSynthEnvelopeValueChange(evt: EnvelopeValueChangeEvent) {
        const data = this.instrument.data.set(evt.detail.type, evt.detail.value);
        appStore.dispatch(
            setInstrumentData(this.instrumentId, data)
        )
    }

    onFMSynthOscillatorModulationEnvelopeChange(evt: EnvelopeValueChangeEvent) {
        const data = this.instrument.data.setIn(['modulationEnvelope', evt.detail.type], evt.detail.value);
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

    onNoiseTypeChange(evt: ButtonGroupValueChangeEvent<NoiseType>) {
        const { value } = evt.detail;
        const data = this.instrument.data.set('noiseType', value);
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

    /*
     *
     *  Generic
     *
     */
    onOscillatorTypeChange(evt: WaveformChangeEvent) {
        const { value } = evt.detail;
        const data = this.instrument.data.setIn(['oscillator', 'type'], value);
        appStore.dispatch(
            setInstrumentData(this.instrumentId, data)
        );
    }

    onEnvelopeValueChanged(evt: EnvelopeValueChangeEvent) {
        const data = this.instrument.data.setIn(['envelope', evt.detail.type], evt.detail.value);
        appStore.dispatch(
            setInstrumentData(this.instrumentId, data)
        );
    }

    onModulationEnvelopeChanged(evt: EnvelopeValueChangeEvent) {
        const data = this.instrument.data.setIn(['modulationEnvelope', evt.detail.type], evt.detail.value);
        appStore.dispatch(
            setInstrumentData(this.instrumentId, data)
        );
    }

    onModulationTypeChange(evt: ButtonGroupValueChangeEvent<WaveformTypes>) {
        const data = this.instrument.data.setIn(['modulation', 'type'], evt.detail.value);
        appStore.dispatch(
            setInstrumentData(this.instrumentId, data)
        );
    }

    onFilterChanged(evt: FilterChangedEvent) {
        const data = this.instrument.data
            .setIn(['filter', 'type'], evt.detail.type)
            .setIn(['filter', 'Q'], evt.detail.Q)
            .setIn(['filter', 'rolloff'], evt.detail.rolloff);
        appStore.dispatch(
            setInstrumentData(this.instrumentId, data)
        );
    }

    onFilterEnvelopeValueChanged(evt: EnvelopeValueChangeEvent) {
        const data = this.instrument.data.setIn(['filterEnvelope', evt.detail.type], evt.detail.value);
        appStore.dispatch(
            setInstrumentData(this.instrumentId, data)
        );
    }

    /*
     *
     *  FM Synth
     *
     */
    onFMSynthEnvelopeValueChange(evt: EnvelopeValueChangeEvent) {
        const data = this.instrument.data.setIn(['envelope', evt.detail.type], evt.detail.value);
        appStore.dispatch(
            setInstrumentData(this.instrumentId, data)
        );
    }

    onFMSynthModulationEnvelopeValueChange(evt: EnvelopeValueChangeEvent) {
        const data = this.instrument.data.setIn(['modulationEnvelope', evt.detail.type], evt.detail.value);
        appStore.dispatch(
            setInstrumentData(this.instrumentId, data)
        );
    }

    onFMSynthOscillatorChange(evt: ButtonGroupValueChangeEvent<WaveformTypes>) {
        const { value } = evt.detail;
        const data = this.instrument.data.setIn(['oscillator', 'type'], value);
        appStore.dispatch(
            setInstrumentData(this.instrumentId, data)
        );
    }

    onFMSynthOscillatorModulationTypeChange(evt: ButtonGroupValueChangeEvent<WaveformTypes>) {
        const data = this.instrument.data.setIn(['modulation', 'type'], evt.detail.value);
        appStore.dispatch(
            setInstrumentData(this.instrumentId, data)
        );
    }

     /*
     *
     *  Membrane Synth
     *
     */

    get drumMachineEnvelopeFields() {
        return ['attack', 'release'];
    }

    get noiseSynthEnvelopeFields() {
        return ['attack', 'decay', 'sustain'];
    }
}
