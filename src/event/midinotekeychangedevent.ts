import { PianoKey } from "util/sound";

export type MidiNoteKeyChangedEvent = CustomEvent<{
    noteId: string;
    key: PianoKey;
}>

export function midiNoteKeyChangedEvent(noteId: string, key: PianoKey): MidiNoteKeyChangedEvent {
    return new CustomEvent('midinotekeychanged', {
        bubbles: true,
        composed: true,
        detail: {
            noteId,
            key
        }
    });
}
