import { Tick, quanitize } from "store/tick";
import { Tempo } from "store/project";

export type MarkerTickChangedEvent = CustomEvent<{
    markerId: string;
    tick: Tick;
    quanitized: Tick;
}>;

export function markerTickChangedEvent(markerId: string, tick: Tick, quanitizeResolution: Tick, tempo: Tempo): MarkerTickChangedEvent {
    const quanitized = quanitize(quanitizeResolution, tick, tempo);
    return new CustomEvent('markertickchanged', {
        bubbles: true,
        composed: true,
        detail: {
            tick,
            markerId,
            quanitized,
        }
    });
}
