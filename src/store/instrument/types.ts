import { Time } from "util/time";
import { PianoKey } from "util/sound";
import { DrumMachineData } from './nodes/DrumMachine';
import { SynthData } from './nodes/Synth';
import { ProcessingNode } from "tone";

export type InstrumentData = DrumMachineData | SynthData;

export enum InstrumentType {
    DrumMachine = 'Drum Machine',
    Synth = 'Synth',
}

export interface InstrumentAudioNode<T extends InstrumentData> {
    type: InstrumentType;
    trigger(key: PianoKey, velocity: number, when: Time, offset: Time | null, duration: Time | null): void;
    connect(node: ProcessingNode): void;
    release(): void;
    update(data: T): void;
}
