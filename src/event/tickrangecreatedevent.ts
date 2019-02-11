import { TickRange } from "store/tick";

export type TickRangeCreatedEvent<T> = CustomEvent<{
    range: TickRange;
    id: string;
    parentId: T;
}>;

export function tickRangeCreatedEvent<T extends string>(parentId: T, id: string, range: TickRange): TickRangeCreatedEvent<T> {
    return new CustomEvent('tickrangecreated', {
        bubbles: true,
        composed: true,
        detail: {
            range,
            id,
            parentId,
        }
    });
}
