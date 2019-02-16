export type AudioWindowMouseLeaveEvent = CustomEvent<{}>;

export function audioWindowMouseLeaveEvent(): AudioWindowMouseLeaveEvent {
    return new CustomEvent('audiowindowmouseleave', {
        bubbles: true,
        composed: true,
        detail: { }
    });
}
