import { Tick, quanitize } from "store/tick";
import { Tempo } from "store/project";

export type AudioWindowMouseEnterEvent = CustomEvent<{
    tick: Tick;
    quanitized: Tick;
}>;

export function audioWindowMouseEnterEvent(tick: Tick, quanitizeResolution: Tick, tempo: Tempo): AudioWindowMouseEnterEvent {
    const quanitized = quanitize(quanitizeResolution, tick, tempo);
    return new CustomEvent('audiowindowmouseenter', {
        bubbles: true,
        composed: true,
        detail: {
            tick,
            quanitized,
        }
    });
}
