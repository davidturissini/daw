import { LightningElement, wire, api } from 'lwc';
import { wireSymbol } from 'store/index';
import { generateId } from 'util/uniqueid';
import { InstrumentState } from 'store/instrument/reducer';
import { Instrument } from 'store/instrument';
import { Tempo } from 'store/project';

interface InstrumentViewModel {
    instrument: Instrument<any>;
    active: boolean;
}

export default class JamElement extends LightningElement {
    @api selectedInstrumentId?: string;
    @api tempo: Tempo;
    @wire(wireSymbol, {
        paths: {
            instruments: ['instrument', 'items'],
        }
    })
    storeData: {
        data: {
            instruments: InstrumentState['items'];
        }
    }

    get instruments() {
        return this.storeData.data.instruments.toList().toArray();
    }

    get instrumentViewModels(): InstrumentViewModel[] {
        const { selectedInstrumentId } = this;
        return this.instruments.map((instrument) => {
            return {
                instrument,
                active: instrument.id === selectedInstrumentId,
            };
        })
    }

    /*
     *
     * Track Loop Events
     *
     */
    onCreateTrackLoop(evt) {
        const loopId = generateId();

    }
}
