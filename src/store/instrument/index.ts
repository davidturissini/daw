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

export class Instrument<T> extends Record({
    type: InstrumentType.Oscillator,
    data: {},
    id: '',
}) {
    id: string;
    type: InstrumentType;
    data: T
}
