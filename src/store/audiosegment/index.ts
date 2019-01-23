import { Record } from 'immutable';
import { AudioRange } from 'util/audiorange';
import { timeZero } from 'util/time';

export class AudioSegment extends Record<{
    id: string;
    range: AudioRange;
    trackId: string;
    sourceId: string;
}>({
    id: '',
    range: new AudioRange(timeZero, timeZero),
    trackId: '',
    sourceId: '',
}) {}
