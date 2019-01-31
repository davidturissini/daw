import {
    PLAY_TRACK_LOOP,
    START_PLAYBACK,
} from './const';
import { Action } from 'store/index';
import { AudioRange } from 'util/audiorange';
import { Tempo } from 'store/project';

export type PlayTrackLoopAction = Action<{
    loopId: string;
    instrumentId: string;
    audioContext: AudioContext;
    tempo: Tempo;
}>;
export function playTrackLoop(audioContext: AudioContext, loopId: string, instrumentId: string, tempo: Tempo): PlayTrackLoopAction {
    return {
        type: PLAY_TRACK_LOOP,
        payload: {
            audioContext,
            loopId,
            instrumentId,
            tempo,
        }
    }
}

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
