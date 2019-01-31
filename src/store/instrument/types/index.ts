import { AudioRange } from "util/audiorange";
import { Time } from "util/time";

export enum InstrumentType {
    DrumMachine = 'Drum Machine',
    Oscillator = 'Oscillator',
}

export interface InstrumentRenderer {
    audioContext: AudioContext;
    type: InstrumentType;
    trigger(frequency: number, range: AudioRange, offset: Time): Promise<any>;
    connect(node: AudioNode): void;
    kill(): void;
}
