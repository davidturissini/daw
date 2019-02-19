import { Tick, tickPlus, quanitize, tickRange, TickRange } from "store/tick";
import { Tempo } from "store/project";
import { Origin } from "util/geometry";

export type MidiNoteRangeChangedEvent = CustomEvent<{
    noteId: string;
    range: TickRange;
    quanitizedRange: TickRange;
    origin: Origin;
}>;

interface MidiNoteRangeChangedEventOptions {
    noteId: string;
    currentRange: TickRange;
    startDelta: Tick;
    durationDelta: Tick;
    quanitizeResolution: Tick;
    tempo: Tempo;
    origin: Origin;
}

export function midiNoteRangeChangedEvent(options: MidiNoteRangeChangedEventOptions): MidiNoteRangeChangedEvent {
    const {
        noteId,
        currentRange,
        durationDelta,
        quanitizeResolution,
        tempo,
        startDelta,
        origin,
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
            noteId,
            range: nextRange,
            quanitizedRange,
            origin,
        }
    });
}
