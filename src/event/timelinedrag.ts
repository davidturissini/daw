import { Tick, TickRange } from "store/tick";

export type TimelineDragEvent = CustomEvent<{
    delta: Tick;
    range: TickRange;
}>;

export function timelineDragEvent(delta: Tick, range: TickRange): TimelineDragEvent {
    return new CustomEvent('timelinedrag', {
        bubbles: true,
        composed: true,
        detail: {
            delta,
            range,
        }
    });
}
