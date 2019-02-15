import { TickRange } from "store/tick";

export type KeyboardRangeChangeEvent = CustomEvent<{
    range: TickRange;
}>;

export function keyboardRangeChangeEvent(range: TickRange): KeyboardRangeChangeEvent {
    return new CustomEvent('keyboardrangechange', {
        bubbles: true,
        composed: true,
        detail: {
            range,
        }
    });
}
