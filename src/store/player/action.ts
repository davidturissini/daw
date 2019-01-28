import {
    START_PLAYBACK,
} from './const';
import { Action } from 'store/index';
import { AudioRange } from 'util/audiorange';

export type StartPlaybackAction = Action<{
    range: AudioRange;
    repeat: boolean;
    audioContext: AudioContext;
}>

export function startPlayback(audioContext: AudioContext, range: AudioRange, repeat: boolean): StartPlaybackAction {
    return {
        type: START_PLAYBACK,
        payload: {
            audioContext,
            range,
            repeat,
        }
    }
}
