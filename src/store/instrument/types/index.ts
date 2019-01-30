import { AudioRange } from "util/audiorange";

export enum InstrumentType {
    DrumMachine = 'Drum Machine',
    Oscillator = 'Oscillator',
}

export interface InstrumentRenderer {
    audioContext: AudioContext;
    type: InstrumentType;
    trigger(frequency: number, range: AudioRange): Promise<any>;
    connect(node: AudioNode): void;
}
