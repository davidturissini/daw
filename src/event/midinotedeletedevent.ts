import { PianoKey } from "util/sound";

export type MidiNoteDeletedEvent = CustomEvent<{
    id: string;
    key: PianoKey;
}>;

export function midiNoteDeletedEvent(key: PianoKey, id: string): MidiNoteDeletedEvent {
    return new CustomEvent('midinotedeleted', {
        bubbles: true,
        composed: true,
        detail: {
            id,
            key,
        }
    });
}
