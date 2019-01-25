import { Record } from 'immutable';
import { AudioRange } from 'util/audiorange';

interface MidiNode {
    range: AudioRange;
    octave: string;

}

export class AudioSource extends Record<{
    id: string;
    title: string;
    notes: MidiNode[];
}>({
    title: '',
    id: '',
    notes: [],
}) {

}
