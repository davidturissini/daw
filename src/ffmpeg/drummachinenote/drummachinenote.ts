import { LightningElement, api } from 'lwc';
import { TickRange, Tick } from 'store/tick';
import { PianoKey } from 'util/sound';
import { generateId } from 'util/uniqueid';
import { MidiNoteCreatedEvent, midiNoteCreatedEvent } from 'event/midinotecreatedevent';
import { Tempo } from 'store/project';
import { Rect } from 'interactjs';
import { Color } from 'util/color';
import { MidiNoteDeletedEvent, midiNoteDeletedEvent } from 'event/midinotedeletedevent';

export default class DrumMachineTick extends LightningElement {
    @api range: TickRange;
    @api tempo: Tempo;
    @api parentVisibleRange: TickRange;
    @api parentRect: Rect;
    @api quanitizeResolution: Tick;
    @api pianoKey: PianoKey;
    @api noteId?: string;
    @api isPlaying: boolean;

    get noteColor() {
        if (this.isPlaying) {
            return new Color(47, 97, 147);
        }

        if (this.noteId) {
            return new Color(163, 163, 163);
        }
        return new Color(61, 61, 61);
    }

    onMidiNoteClick(evt) {
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
