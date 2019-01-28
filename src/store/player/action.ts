import {
    PLAY_TRACK_LOOP,
    START_PLAYBACK,
} from './const';
import { Action } from 'store/index';
import { AudioRange } from 'util/audiorange';

export type PlayTrackLoopAction = Action<{
    loopId: string;
    trackId: string;
    instrumentId: string;
    audioContext: AudioContext;
    bpm: number;
}>;
export function playTrackLoop(audioContext: AudioContext, trackId: string, loopId: string, instrumentId: string, bpm: number): PlayTrackLoopAction {
    return {
        type: PLAY_TRACK_LOOP,
        payload: {
            audioContext,
            trackId,
            loopId,
            instrumentId,
            bpm,
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
