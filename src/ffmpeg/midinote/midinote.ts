import { LightningElement, api } from 'lwc';
import { PianoKey } from 'util/sound';

export default class MidiNoteElement extends LightningElement {
    @api pianoKey: PianoKey;
}
