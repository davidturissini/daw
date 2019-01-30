import { Record } from 'immutable';
import { InstrumentType, InstrumentRenderer } from './types';
import { DrumMachine, DrumMachineData } from './types/DrumMachine';
import { Oscillator } from './types/Oscillator';
import { Tempo } from 'store/project';

export type InstrumentDataTypes = DrumMachineData;

export class Instrument<T> extends Record<{
    id: string;
    type: InstrumentType;
    data: any;
}>({
    type: InstrumentType.DrumMachine,
    id: '',
    data: {},
}) {
    data: T;
}

export function render(audioContext: AudioContext, instrument: Instrument<any>, tempo: Tempo): InstrumentRenderer {
    switch(instrument.type) {
        case InstrumentType.DrumMachine:
            return new DrumMachine(audioContext, tempo, instrument.data as DrumMachineData);
        case InstrumentType.Oscillator:
            return new Oscillator(audioContext);
    }
}
