import { LightningElement, api } from 'lwc';
import { KeyboardVariant } from 'cmp/keyboard/keyboard';
import { Note, PianoKey } from 'util/sound';

export default class KeyboardKeyElement extends LightningElement {
    @api variant: KeyboardVariant;
    @api note: Note;
    @api pianoKey: PianoKey;

    get isPianoVariant() {
        return this.variant === KeyboardVariant.Piano;
    }

    get isDrumMachine() {
        return this.variant === KeyboardVariant.DrumMachine;
    }
}
