import { LightningElement, wire } from 'lwc';
import { masterOutSym, setGain } from './../../wire/masterout';

export default class MasterOut extends LightningElement {
    @wire(masterOutSym, {})
    masterOut;


    handleGainChange(evt) {
        setGain(parseFloat(evt.target.value));
    }
}
