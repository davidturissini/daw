import { Record, List } from 'immutable';
import { InstrumentType, InstrumentAudioNode, InstrumentData } from './types';
import { DrumMachine, DrumMachineData } from './nodes/DrumMachine';
import { SynthNode, SynthData } from './nodes/Synth';
import { NoiseSynthNode, NoiseSynthData } from './nodes/NoiseSynth';
import { AMSynthNode, AMSynthData } from './nodes/AMSynth';
import { DuoSynthNode, DuoSynthData } from './nodes/DuoSynth';
import { FMSynthData, FMSynthNode, } from './nodes/FMSynth';
import { MonoSynthNode, MonoSynthData } from './nodes/MonoSynth';
import { PluckSynthNode, PluckSynthData } from './nodes/PluckSynth';
import { MetalSynthNode, MetalSynthData } from './nodes/MetalSynth';
import { MembraneSynthNode, MembraneSynthData } from './nodes/MembraneSynth';

export { InstrumentData } from './types';

export class Instrument<T extends InstrumentData> extends Record<{
    id: string;
    type: InstrumentType;
    data: any;
    loops: List<string>;
    title: string;
}>({
    type: InstrumentType.DrumMachine,
    id: '',
    data: {},
    loops: List(),
    title: '',
}) {
    data: T;
}

export function createInstrumentNode(type: InstrumentType, data: InstrumentData): InstrumentAudioNode<InstrumentData> {
    switch(type) {
        case InstrumentType.DrumMachine:
            return new DrumMachine(data as DrumMachineData);
        case InstrumentType.Synth:
            return new SynthNode(data as SynthData);
        case InstrumentType.NoiseSynth:
            return new NoiseSynthNode(data as NoiseSynthData);
        case InstrumentType.AMSynth:
            return new AMSynthNode(data as AMSynthData);
        case InstrumentType.DuoSynth:
            return new DuoSynthNode(data as DuoSynthData);
        case InstrumentType.FMSynth:
            return new FMSynthNode(data as FMSynthData);
        case InstrumentType.MonoSynth:
            return new MonoSynthNode(data as MonoSynthData);
        case InstrumentType.PluckSynth:
            return new PluckSynthNode(data as PluckSynthData);
        case InstrumentType.MetalSynth:
            return new MetalSynthNode(data as MetalSynthData);
        case InstrumentType.MembraneSynth:
            return new MembraneSynthNode(data as MembraneSynthData);
    }

    throw new Error('Could not render instrument');
}
