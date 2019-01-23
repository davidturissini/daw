import {
    CREATE_AUDIO_SOURCE
} from './const';

import { Action } from 'store/index';

export type CreateAudioSourceAction = Action<{
    id: string;
}>

export function createAudioSource(id: string): CreateAudioSourceAction {
    return {
        type: CREATE_AUDIO_SOURCE,
        payload: {
            id,
        }
    }
}
