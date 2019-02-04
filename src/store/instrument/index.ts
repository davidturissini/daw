import { Record, List } from 'immutable';
import { InstrumentType, InstrumentRenderer } from './types';
import { DrumMachine, DrumMachineData } from './types/DrumMachine';
import { Oscillator, OscillatorData } from './types/Oscillator';
import { Tempo } from 'store/project';

export type InstrumentData = DrumMachineData | OscillatorData;

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

export function render(audioContext: BaseAudioContext, instrument: Instrument<any>, tempo: Tempo): InstrumentRenderer {
    switch(instrument.type) {
        case InstrumentType.DrumMachine:
            return new DrumMachine(audioContext, tempo);
        case InstrumentType.Oscillator:
            return new Oscillator(audioContext);
    }

    throw new Error('Could not render instrument');
}
