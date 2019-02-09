import { Record, List } from 'immutable';
import { InstrumentType, InstrumentAudioNode } from './types';
import { DrumMachine, DrumMachineData } from './nodes/DrumMachine';
import { SynthNode, SynthData } from './nodes/Synth';
import { Tempo } from 'store/project';

export type InstrumentData = DrumMachineData | SynthData;

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

export function render(audioContext: BaseAudioContext, instrument: Instrument<any>, tempo: Tempo): InstrumentAudioNode {
    switch(instrument.type) {
        case InstrumentType.DrumMachine:
            return new DrumMachine(audioContext, tempo);
        case InstrumentType.Synth:
            return new SynthNode(audioContext, instrument.data);
    }

    throw new Error('Could not render instrument');
}
