import { LightningElement, api } from 'lwc';
import { PianoKey, Note } from 'util/sound';

export default class PianoKeyElement extends LightningElement {
    @api pianoKey: PianoKey;
    @api note: Note;

    get buttonClassName() {
        const { note } = this;

        if (note.sharp) {
            return 'sharp';
        }
        return '';
    }

    get containerClassName() {
        const { note } = this;
        if (note.sharp) {
            return 'container container--sharp';
        }

        return 'container';
    }
}
