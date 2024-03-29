import { Record, Map as ImmutableMap } from 'immutable';
import { MidiNote } from 'util/sound';
import { DrumMachineLoopData } from 'store/instrument/nodes/DrumMachine';
import { SynthLoopData } from 'store/instrument/nodes/Synth';
import { ZERO_BEAT, FOUR_BEAT, TickRange, tickRange, Tick } from 'store/tick';

export type LoopDataTypes = DrumMachineLoopData | SynthLoopData;

export enum LoopPlayState {
    PLAYING, STOPPED
}

export class Loop extends Record<{
    id: string;
    notes: ImmutableMap<string, MidiNote>;
    instrumentId: string;
    range: TickRange,
    data: any;
    playState: LoopPlayState;
}>({
    id: '',
    notes: ImmutableMap(),
    range: tickRange(ZERO_BEAT, FOUR_BEAT),
    instrumentId: '',
    data: {},
    playState: LoopPlayState.STOPPED,
}) {
    notes: ImmutableMap<string, MidiNote>;
    data: LoopDataTypes;
}
