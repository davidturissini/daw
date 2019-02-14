import { TickRange } from 'store/tick';

export type KeyboardRangeCreatedEvent<T> = CustomEvent<{
    range: TickRange;
    id: string;
    parentId: T;
}>;

export function keyboardRangeCreatedEvent<T extends string>(parentId: T, id: string, range: TickRange): KeyboardRangeCreatedEvent<T> {
    return new CustomEvent('keyboardrangecreated', {
        bubbles: true,
        composed: true,
        detail: {
            range,
            id,
            parentId,
        }
    });
}
