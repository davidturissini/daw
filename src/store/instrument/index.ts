import { Record, List } from 'immutable';
import { InstrumentType, InstrumentAudioNode, InstrumentData } from './types';
import { DrumMachine } from './nodes/DrumMachine';
import { SynthNode, SynthData } from './nodes/Synth';

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

export function createInstrumentNode(type: InstrumentType, data: InstrumentData): InstrumentAudioNode {
    switch(type) {
        case InstrumentType.DrumMachine:
            return new DrumMachine();
        case InstrumentType.Synth:
            return new SynthNode(data as SynthData);
    }

    throw new Error('Could not render instrument');
}
