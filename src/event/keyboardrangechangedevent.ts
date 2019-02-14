import { TickRange } from "store/tick";

export type KeyboardRangeChangedEvent<T> = CustomEvent<{
    range: TickRange;
    id: string;
    parentId: T;
}>;

export function keyboardRangeChangedEvent<T extends string>(parentId: T, id: string, range: TickRange): KeyboardRangeChangedEvent<T> {
    return new CustomEvent('keyboardrangechanged', {
        bubbles: true,
        composed: true,
        detail: {
            range,
            id,
            parentId,
        }
    });
}
