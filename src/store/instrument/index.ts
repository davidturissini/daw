import { Record } from 'immutable';

export enum InstrumentType {
    Oscillator = 'OscillatorNode'
}

export enum OscillatorNodeTypes {
    sine = 'sine',
    square = 'square',
    sawtooth = 'sawtooth',
    triangle = 'triangle',
    custom = 'custom',
}

export interface InstrumentDataOscillator {
    detune: number;
    type: OscillatorNodeTypes;
}

export class Instrument extends Record<{
    id: string;
    type: InstrumentType;
    data: InstrumentDataOscillator;
}>({
    type: InstrumentType.Oscillator,
    data: {
        detune: 0,
        type: OscillatorNodeTypes.sine
    },
    id: '',
}) {

}

export function createOscillator(audioContext: AudioContext, frequency: number) {
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.setValueAtTime(frequency, 0);
    return oscillator;
}
