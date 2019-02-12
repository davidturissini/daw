export type TickRangeDeletedEvent<T> = CustomEvent<{
    id: string;
    parentId: T;
}>;

export function tickRangeDeletedEvent<T>(parentId: T, id: string): TickRangeDeletedEvent<T> {
    return new CustomEvent('tickrangedeleted', {
        bubbles: true,
        composed: true,
        detail: {
            id,
            parentId,
        }
    });
}
