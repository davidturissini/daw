import { Tick, quanitize } from "store/tick";
import { Tempo } from "store/project";

export type AudioWindowMouseMoveEvent = CustomEvent<{
    tick: Tick;
    quanitized: Tick;
}>;

export function audioWindowMouseMoveEvent(tick: Tick, quanitizeResolution: Tick, tempo: Tempo): AudioWindowMouseMoveEvent {
    const quanitized = quanitize(quanitizeResolution, tick, tempo);
    return new CustomEvent('audiowindowmousemove', {
        bubbles: true,
        composed: true,
        detail: {
            tick,
            quanitized,
        }
    });
}
