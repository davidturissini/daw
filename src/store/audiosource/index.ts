import { Record } from 'immutable';
import { Time, timeZero } from 'util/time';
import { AudioRange } from 'util/audiorange';

interface MidiNode {
    range: AudioRange;
    data: {
        frequency: number;
    }
}

export class AudioSource extends Record<{
    id: string;
    title: string;
    notes: MidiNode[];
    duration: Time;
}>({
    title: '',
    id: '',
    notes: [],
    duration: timeZero,
}) {

}
