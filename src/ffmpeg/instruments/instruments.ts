import { LightningElement } from 'lwc';
import { appStore } from 'store/index';
import { createInstrument, CreateInstrumentAction } from 'store/instrument/action';
import { generateId } from './../../util/uniqueid'
import { InstrumentType } from 'store/instrument/types';


export default class Instruments extends LightningElement {
    handleOscillatorNodeClick(evt: MouseEvent) {
        const instrumentId = generateId();
        const type = (evt.target as HTMLElement).getAttribute('data-instrument-type');
        const loopId = generateId();
        const audioTrackId = generateId();
        let action: CreateInstrumentAction;
        switch(type) {
            case InstrumentType.DrumMachine:
                action = createInstrument(
                    instrumentId,
                    'Drum Machine',
                    type,
                    {},
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
