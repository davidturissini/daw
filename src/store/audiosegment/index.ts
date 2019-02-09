import { Record, Map as ImmutableMap } from 'immutable';
import { AudioRange } from 'util/audiorange';
import { timeZero } from 'util/time';
import { MidiNote } from 'util/sound';

export class AudioSegment extends Record<{
    id: string;
    range: AudioRange;
    trackId: string;
    notes: ImmutableMap<string, ImmutableMap<string, MidiNote>>
}>({
    id: '',
    range: { start: timeZero, duration: timeZero },
    trackId: '',
    notes: ImmutableMap(),
}) {}
