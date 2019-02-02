import { Record, List } from 'immutable';
import { InstrumentType, InstrumentRenderer } from './types';
import { DrumMachine } from './types/DrumMachine';
import { Oscillator } from './types/Oscillator';
import { Tempo } from 'store/project';

export class Instrument<T> extends Record<{
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

export function render(audioContext: AudioContext, instrument: Instrument<any>, tempo: Tempo): InstrumentRenderer {
    switch(instrument.type) {
        case InstrumentType.DrumMachine:
            return new DrumMachine(audioContext, tempo);
        case InstrumentType.Oscillator:
            return new Oscillator(audioContext);
    }
}
