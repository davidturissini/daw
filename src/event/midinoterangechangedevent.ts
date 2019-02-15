import { Tick, tickPlus, quanitize, tickRange, TickRange } from "store/tick";
import { Tempo } from "store/project";
import { PianoKey } from "util/sound";

export type MidiNoteRangeChangedEvent = CustomEvent<{
    noteId: string;
    range: TickRange;
    quanitizedRange: TickRange;
    key: PianoKey;
}>;

interface MidiNoteRangeChangedEventOptions {
    key: PianoKey,
    noteId: string;
    currentRange: TickRange;
    startDelta: Tick;
    durationDelta: Tick;
    quanitizeResolution: Tick;
    tempo: Tempo;
}

export function midiNoteRangeChangedEvent(options: MidiNoteRangeChangedEventOptions): MidiNoteRangeChangedEvent {
    const {
        key,
        noteId,
        currentRange,
        durationDelta,
        quanitizeResolution,
        tempo,
        startDelta
    } = options;
    const nextDuration = tickPlus(currentRange.duration, durationDelta);
    const quanitizedDuration = quanitize(quanitizeResolution, nextDuration, tempo);

    let nextStart = tickPlus(currentRange.start, startDelta);
    const quanitizedStart = quanitize(quanitizeResolution, nextStart, tempo);
    const nextRange = tickRange(nextStart, nextDuration);
    const quanitizedRange = tickRange(quanitizedStart, quanitizedDuration);
    return new CustomEvent('midinoterangechanged', {
        bubbles: true,
        composed: true,
        detail: {
            key,
            noteId,
            range: nextRange,
            quanitizedRange,
        }
    });
}
