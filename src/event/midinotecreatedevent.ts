import { TickRange } from "store/tick";
import { Origin } from "util/geometry";
import { PianoKey } from "util/sound";

export type MidiNoteCreatedEvent = CustomEvent<{
    noteId: string;
    range: TickRange;
    key: PianoKey
}>;

export function midiNoteCreatedEvent(key: PianoKey, noteId: string, range: TickRange): MidiNoteCreatedEvent {
    return new CustomEvent('midinotecreated', {
        bubbles: true,
        composed: true,
        detail: {
            key,
            noteId,
            range,
        }
    });
}
