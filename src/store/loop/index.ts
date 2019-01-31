import { Record, Map as ImmutableMap } from 'immutable';
import { MidiNote } from 'util/sound';
import { Beat } from 'util/time';
import { DrumMachineLoopData } from 'store/instrument/types/DrumMachine';

export type LoopDataTypes = DrumMachineLoopData;

export class Loop<K extends string> extends Record<{
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
    notes: ImmutableMap<K, ImmutableMap<string, MidiNote>>;
    data: LoopDataTypes;
}
