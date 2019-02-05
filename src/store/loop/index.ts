import { Record, Map as ImmutableMap } from 'immutable';
import { MidiNote, PianoKey } from 'util/sound';
import { Beat } from 'util/time';
import { DrumMachineLoopData } from 'store/instrument/nodes/DrumMachine';
import { SynthLoopData } from 'store/instrument/nodes/Synth';

export type LoopDataTypes = DrumMachineLoopData | SynthLoopData;

export class Loop extends Record<{
    id: string;
    notes: ImmutableMap<string, ImmutableMap<string, MidiNote>>;
    instrumentId: string;
    duration: Beat;
    data: any;
}>({
    id: '',
    notes: ImmutableMap(),
    duration: new Beat(4),
    instrumentId: '',
    data: {}
}) {
    notes: ImmutableMap<PianoKey, ImmutableMap<string, MidiNote>>;
    data: LoopDataTypes;
}
