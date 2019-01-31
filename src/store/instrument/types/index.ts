import { AudioRange } from "util/audiorange";
import { Time } from "util/time";

export enum InstrumentType {
    DrumMachine = 'Drum Machine',
    Oscillator = 'Oscillator',
}

export interface InstrumentRenderer<K> {
    audioContext: AudioContext;
    type: InstrumentType;
    trigger(key: K, range: AudioRange, offset: Time): Promise<any>;
    connect(node: AudioNode): void;
    kill(): void;
}
