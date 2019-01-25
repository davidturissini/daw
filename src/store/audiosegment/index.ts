import { Record, Map as ImmutableMap, List } from 'immutable';
import { AudioRange } from 'util/audiorange';
import { timeZero } from 'util/time';
import { MidiNote } from 'util/sound';

export class AudioSegment extends Record<{
    id: string;
    range: AudioRange;
    trackId: string;
    notes: ImmutableMap<string, List<MidiNote>>
}>({
    id: '',
    range: new AudioRange(timeZero, timeZero),
    trackId: '',
    notes: ImmutableMap(),
}) {}
