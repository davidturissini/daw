import { LightningElement, wire } from 'lwc';
import { appStore, wireSymbol } from 'store/index';
import { setMasterOutGain } from 'store/masterout/action';
import { decibel } from 'units/decibel';
import { MasterOutState } from 'store/masterout/reducer';

export default class MasterOut extends LightningElement {
    @wire(wireSymbol, {
        paths: {
            masterout: ['masterout']
        }
    })
    storeData: {
        data: {
            masterout: MasterOutState
        }
    }


    get masterGainValue() {
        return this.storeData.data.masterout.gain.value;
    }

    get masterMeterDecibel() {
        return this.storeData.data.masterout.meter;
    }

    handleGainChange(evt) {
        const target = evt.target as HTMLInputElement;
        const value = parseFloat(target.value);
        appStore.dispatch(
            setMasterOutGain(decibel(value))
        )
    }
}
