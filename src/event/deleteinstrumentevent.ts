export type DeleteInstrumentEvent = CustomEvent<{
    instrumentId: string;
}>;

export function deleteInstrumentEvent(instrumentId: string): DeleteInstrumentEvent {
    return new CustomEvent('deleteinstrument', {
        bubbles: true,
        composed: true,
        detail: {
            instrumentId,
        }
    });
}
