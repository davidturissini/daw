import { LightningElement, api, wire } from 'lwc';
import { wireSymbol, appStore } from 'store/index';
import { InstrumentState } from 'store/instrument/reducer';
import { Instrument } from 'store/instrument';
import { InstrumentType } from 'store/instrument/types';
import { setInstrumentData } from 'store/instrument/action';

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

    get instrumentData() {
        return this.instrument.data;
    }

    onAttachInput(evt) {
        const data = this.instrument.data.set('attack', parseFloat(evt.target.value));
        appStore.dispatch(
            setInstrumentData(this.instrumentId, data)
        );
    }

    connectedCallback() {
        console.log(this.instrument.data);
    }
}
