import { LightningElement, api } from 'lwc';
import { TickRange } from 'store/tick';
import { PianoKey } from 'util/sound';
import { generateId } from 'util/uniqueid';
import { MidiNoteCreatedEvent, midiNoteCreatedEvent } from 'event/midinotecreatedevent';
import { MidiNoteDeletedEvent, midiNoteDeletedEvent } from 'event/midinotedeletedevent';

export default class DrumMachineTick extends LightningElement {
    @api range: TickRange;
    @api pianoKey: PianoKey;
    @api noteId?: string;
    @api isPlaying: boolean;
    get divClass(): string {
        const classNames: string[]= [];
        if (this.noteId) {
            classNames.push('active');
        }
        if (this.isPlaying) {
            classNames.push('playing');
        }

        return classNames.join(' ');
    }

    onDivClick() {
        const { noteId } = this;
        if (!noteId) {
            const createMidiEvent: MidiNoteCreatedEvent = midiNoteCreatedEvent(this.pianoKey, generateId(), this.range);
            this.dispatchEvent(createMidiEvent);
            return;
        }
        const deleteMidiEvent: MidiNoteDeletedEvent = midiNoteDeletedEvent(this.pianoKey, noteId);
        this.dispatchEvent(deleteMidiEvent);
    }
}
