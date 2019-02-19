import { FilterType, FilterRolloff } from "tone";

export type FilterChangedEvent = CustomEvent<{
    type: FilterType;
    Q: number;
    rolloff: FilterRolloff;
}>

export function filterChangedEvent(type: FilterType, Q: number, rolloff: FilterRolloff): FilterChangedEvent {
    return new CustomEvent('filterchanged', {
        bubbles: true,
        composed: false,
        detail: {
            type,
            Q,
            rolloff,
        }
    })
}
