import { Origin } from "util/geometry";
import { Tick } from "store/tick";

export type AudioWindowDragStartEvent = CustomEvent<{
    origin: Origin;
    tick: Tick;
}>;

export function audioWindowDragStartEvent(origin: Origin, tick: Tick): AudioWindowDragStartEvent {
    return new CustomEvent('audiowindowdragstart', {
        bubbles: true,
        composed: false,
        detail: {
            origin,
            tick,
        }
    });
}
