import {
    PLAY_TRACK_LOOP,
    PLAY_PIANO_KEY,
    STOP_PIANO_KEY,
    STOP_LOOP,
} from './const';
import { Action } from 'store/index';
import { Tempo } from 'store/project';
import { PianoKey } from 'util/sound';

export type StopLoopAction = Action<{
    loopId: string;
}>

export function stopLoop(loopId: string): StopLoopAction {
    return {
        type: STOP_LOOP,
        payload: {
            loopId,
        }
    }
}

export type StopPianoKeyAction = Action<{
    instrumentId: string;
    key: PianoKey;
}>
export function stopPianoKey(instrumentId: string, key: PianoKey): StopPianoKeyAction {
    return {
        type: STOP_PIANO_KEY,
        payload: {
            instrumentId,
            key,
        },
    }
}

export type PlayPianoKeyAction = Action<{
    instrumentId: string;
    key: PianoKey
}>
export function playPianoKey(instrumentId: string, key: PianoKey): PlayPianoKeyAction {
    return {
        type: PLAY_PIANO_KEY,
        payload: {
            instrumentId,
            key,
        }
    }
}

export type PlayTrackLoopAction = Action<{
    loopId: string;
    instrumentId: string;
    tempo: Tempo;
}>;
export function playTrackLoop(loopId: string, instrumentId: string, tempo: Tempo): PlayTrackLoopAction {
    return {
        type: PLAY_TRACK_LOOP,
        payload: {
            loopId,
            instrumentId,
            tempo,
        }
    }
}
