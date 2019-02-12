import { TickRange } from "store/tick";

export type LoopRangeChangeEvent = CustomEvent<{
    loopId: string;
    range: TickRange;
}>;

export function loopRangeChangeEvent(loopId: string, range: TickRange): LoopRangeChangeEvent {
    return new CustomEvent('looprangechange', {
        bubbles: true,
        composed: true,
        detail: {
            loopId,
            range,
        }
    });
}
