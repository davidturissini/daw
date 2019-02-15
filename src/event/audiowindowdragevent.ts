import { Origin } from "util/geometry";
import { Tick } from "store/tick";

export type AudioWindowDragEvent = CustomEvent<{
    origin: Origin;
    delta: Tick;
}>;

export function audioWindowDragEvent( origin: Origin, delta: Tick): AudioWindowDragEvent {
    return new CustomEvent('audiowindowdrag', {
        bubbles: true,
        composed: false,
        detail: {
            origin,
            delta,
        }
    });
}
