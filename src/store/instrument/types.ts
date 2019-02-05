import { Time } from "util/time";
import { PianoKey } from "util/sound";

export enum InstrumentType {
    DrumMachine = 'Drum Machine',
    Synth = 'Synth',
}

export interface InstrumentAudioNode {
    audioContext: BaseAudioContext;
    type: InstrumentType;
    trigger(key: PianoKey, velocity: number, when: Time, offset: Time | null, duration: Time | null): void;
    connect(node: AudioNode): void;
    release(): void;
}
