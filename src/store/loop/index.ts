import { Record, Map as ImmutableMap } from 'immutable';
import { MidiNote } from 'util/sound';
import { Beat } from 'util/time';

export class Loop extends Record<{
    id: string;
    notes: ImmutableMap<string, MidiNote>;
    instrumentId: string;
    duration: Beat;
}>({
    id: '',
    notes: ImmutableMap(),
    duration: new Beat(4),
    instrumentId: '',
}) {

}
