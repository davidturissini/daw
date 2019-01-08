import { LightningElement, wire } from 'lwc';
import { masterOutSym, setGain } from './../../wire/masterout';

export default class MasterOut extends LightningElement {
    @wire(masterOutSym, {})
    masterOut;

    get masterGain() {
        return this.masterOut.data.gain;
    }

    handleGainChange(evt) {
        setGain(parseFloat(evt.target.value));
    }
}
