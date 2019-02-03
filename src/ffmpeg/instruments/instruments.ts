import { LightningElement } from 'lwc';
import { appStore } from 'store/index';
import { createInstrument, CreateInstrumentAction } from 'store/instrument/action';
import { generateId } from './../../util/uniqueid'
import { InstrumentType, DrumMachineData } from 'store/instrument/types';
import { PianoKey } from 'util/sound';


export default class Instruments extends LightningElement {
    handleOscillatorNodeClick(evt: MouseEvent) {
        const instrumentId = generateId();
        const type = (evt.target as HTMLElement).getAttribute('data-instrument-type');
        const loopId = generateId();
        const audioTrackId = generateId();
        let action: CreateInstrumentAction<any>;
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
        switch(type) {
            case InstrumentType.DrumMachine:
                action = createInstrument<DrumMachineData>(
                    instrumentId,
                    'Drum Machine',
                    type,
                    data,
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
