import { LightningElement } from 'lwc';
import { appStore } from 'store/index';
import { createInstrument, CreateInstrumentAction } from 'store/instrument/action';
import { generateId } from './../../util/uniqueid'
import { InstrumentType } from 'store/instrument/types';
import { PianoKey } from 'util/sound';
import { OscillatorData } from 'store/instrument/types/Oscillator';
import { DrumMachineData } from 'store/instrument/types/DrumMachine';


export default class Instruments extends LightningElement {
    handleOscillatorNodeClick(evt: MouseEvent) {
        const instrumentId = generateId();
        const type = (evt.target as HTMLElement).getAttribute('data-instrument-type');
        const loopId = generateId();
        const audioTrackId = generateId();
        let action: CreateInstrumentAction<any>;
        switch(type) {
            case InstrumentType.DrumMachine:
                const data = new DrumMachineData({
                    sampleNames: {
                        [PianoKey.C3]: 'Kick Drum',
                        [PianoKey.Csharp3]: 'Snare Drum',
                        [PianoKey.D3]: 'Hi Hat',
                        [PianoKey.Dsharp3]: null,
                        [PianoKey.E3]: null,
                        [PianoKey.F3]: null,
                        [PianoKey.Fsharp3]: null,
                        [PianoKey.G3]: null,
                    }
                });
                action = createInstrument<DrumMachineData>(
                    instrumentId,
                    'Drum Machine',
                    type,
                    data,
                    audioTrackId,
                    loopId,
                );
                break;
            case InstrumentType.Oscillator:
                action = createInstrument<OscillatorData>(
                    instrumentId,
                    'Oscillator',
                    type,
                    new OscillatorData({}),
                    audioTrackId,
                    loopId,
                );
                break;
            default:
                throw new Error(`Not Implemented ${type}`);
        }

        appStore.dispatch(action);
    }

    get instruments() {
        return [{
            type: InstrumentType.DrumMachine,
        }, {
            type: InstrumentType.Oscillator,
        }];
    }
}
