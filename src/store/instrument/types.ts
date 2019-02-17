import { Time } from "util/time";
import { PianoKey } from "util/sound";
import { DrumMachineData } from './nodes/DrumMachine';
import { SynthData } from './nodes/Synth';
import { NoiseSynthData } from './nodes/NoiseSynth';
import { AudioNode as ToneAudioNode, Master as ToneMaster } from 'tone';
import { AMSynthData } from "./nodes/AMSynth";
import { DuoSynthData } from "./nodes/DuoSynth";
import { FMSynthData } from "./nodes/FMSynth";
import { MonoSynthData } from "./nodes/MonoSynth";
import { PluckSynthData } from "./nodes/PluckSynth";
import { MetalSynthData } from "./nodes/MetalSynth";
import { MembraneSynthData } from "./nodes/MembraneSynth";

export type InstrumentData = DrumMachineData | SynthData | NoiseSynthData | AMSynthData | DuoSynthData | FMSynthData | MonoSynthData | PluckSynthData | MetalSynthData | MembraneSynthData;

export enum InstrumentType {
    DrumMachine = 'DrumMachine',
    Synth = 'Synth',
    NoiseSynth = 'NoiseSynth',
    AMSynth = 'AMSynth',
    DuoSynth = 'DuoSynth',
    FMSynth = 'FMSynth',
    MonoSynth = 'MonoSynth',
    PluckSynth = 'PluckSynth',
    MetalSynth = 'MetalSynth',
    MembraneSynth = 'MembraneSynth',
}

export interface InstrumentAudioNode<T extends InstrumentData> {
    type: InstrumentType;
    trigger(key: PianoKey, velocity: number, when: Time, offset: Time | null, duration: Time | null): void;
    release(): void;
    connect(note: ToneAudioNode | ToneMaster): void;
    update(data: T): void;
}
