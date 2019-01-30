import { LightningElement, api, wire } from 'lwc';
import { wireSymbol, appStore } from 'store/index';
import { InstrumentState } from 'store/instrument/reducer';
import { Instrument } from 'store/instrument';
import { InstrumentType } from 'store/instrument/types';
import { DrumMachineData } from 'store/instrument/types/DrumMachine';
import { setDrumMachineSwitchOnOff } from 'store/instrument/action';

export default class InstrumentEditorElement extends LightningElement {
    @api instrumentId: string;

    @wire(wireSymbol, {
        paths: {
            instrument: ['instrument', 'items']
        }
    })
    storeData: {
        data: {
            instrument: InstrumentState['items']
        }
    }

    instrument<T>(): Instrument<T> {
        return this.storeData.data.instrument.get(this.instrumentId) as Instrument<T>;
    }

    get isDrumMachineInstrument(): boolean {
        return this.instrument<any>().type === InstrumentType.DrumMachine;
    }

    get isOscillatorInstrument(): boolean {
        return this.instrument<any>().type === InstrumentType.Oscillator;
    }

    /*
     *
     *  Drum Machine
     *
     */
    get drumMachineSamples() {
        const { data } = this.instrument<DrumMachineData>();
        return data.samples.map((sample, index) => {
            return {
                id: index,
                title: sample.sample === null ? null : 'Sample',
                ...sample,
                switches: sample.switches.map((swtch, switchIndex) => {
                    return {
                        ...swtch,
                        className: swtch.onOff ? 'switch--selected switch' : 'switch',
                        id: switchIndex,
                    }
                })
            };
        });
    }

    get drumMachineSampleLabels(): string[] {
        const { data } = this.instrument<DrumMachineData>();
        const { duration, resolution } = data;
        const labels: string[] = []
        const numberOfBeats = duration.index / resolution.index;

        for(let i = 0; i < numberOfBeats; i += 1) {
            labels.push(`${i} / 4`);
        }
        console.log(labels)
        return labels;
    }

    onBeatClick(evt: MouseEvent) {
        const target = evt.target as HTMLElement;
        const sampleId = parseInt(target.getAttribute('data-sample-id') as string, 10);
        const switchId = parseInt(target.getAttribute('data-beat-id') as string, 10);

        appStore.dispatch(
            setDrumMachineSwitchOnOff(this.instrumentId, switchId, sampleId, true),
        );
    }


}
