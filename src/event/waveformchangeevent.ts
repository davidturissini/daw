import { WaveformTypes } from "cmp/waveformfield/waveformfield";

export type WaveformChangeEvent = CustomEvent<{
    value: WaveformTypes;
}>;

export function waveformChangeEvent(value: WaveformTypes): WaveformChangeEvent {
    return new CustomEvent('waveformchange', {
        bubbles: true,
        composed: true,
        detail: {
            value,
        }
    });
}
