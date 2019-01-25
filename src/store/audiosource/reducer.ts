import { Record, Map as ImmutableMap } from 'immutable';
import { AudioSource } from './index';
import { CREATE_AUDIO_SOURCE } from './const';
import { CreateAudioSourceAction } from './action';
import { AudioRange } from 'util/audiorange';
import { Time, timeZero } from 'util/time';

export class AudioSourceState extends Record<{
    items: ImmutableMap<string, AudioSource>
}>({
    items: ImmutableMap(),
}) {}

function createAudioSourceReducer(state: AudioSourceState, action: CreateAudioSourceAction): AudioSourceState {
    const { id } = action.payload;
    const base = 0.46875;
    const quarter = base / 4;
    const eighth = base / 8;
    const source = new AudioSource({
        id,
        notes: [{
            range: new AudioRange(timeZero, Time.fromSeconds(1)),
            octave: 'a4',
        },
        {
            range: new AudioRange(timeZero, Time.fromSeconds(1)),
            octave: 'e4',
        }]
    });
    return state.setIn(['items', '4'], source);
}

export function reducer(state = new AudioSourceState(), action) {
    switch(action.type) {
        case CREATE_AUDIO_SOURCE:
            return createAudioSourceReducer(state, action);
    }
    return state;
}
