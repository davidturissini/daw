import { Record, Map as ImmutableMap } from 'immutable';
import { MidiNote, PianoKey } from 'util/sound';
import { Time } from 'util/time';
import { DrumMachineLoopData } from 'store/instrument/nodes/DrumMachine';
import { SynthLoopData } from 'store/instrument/nodes/Synth';
import { ZERO_BEAT, FOUR_BEAT, TickRange, tickRange, tick } from 'store/tick';

export type LoopDataTypes = DrumMachineLoopData | SynthLoopData;

export class Loop extends Record<{
    id: string;
    notes: ImmutableMap<string, ImmutableMap<string, MidiNote>>;
    instrumentId: string;
    range: TickRange,
    data: any;
    currentTime: Time | null;
}>({
    id: '',
    notes: ImmutableMap(),
    range: tickRange(ZERO_BEAT, FOUR_BEAT),
    instrumentId: '',
    data: {},
    currentTime: null,
}) {
    notes: ImmutableMap<PianoKey, ImmutableMap<string, MidiNote>>;
    data: LoopDataTypes;
}
