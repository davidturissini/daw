import { LightningElement, api } from 'lwc';
import { Note, PianoKey } from 'util/sound';

export default class DrumMachineKey extends LightningElement {
    @api note: Note;
    @api pianoKey: PianoKey;
}
