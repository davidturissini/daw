export type MidiNoteDeletedEvent = CustomEvent<{
    id: string;
}>;

export function midiNoteDeletedEvent(id: string): MidiNoteDeletedEvent {
    return new CustomEvent('midinotedeleted', {
        bubbles: true,
        composed: true,
        detail: {
            id,
        }
    });
}
