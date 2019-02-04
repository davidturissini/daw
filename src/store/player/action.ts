import {
    PLAY_TRACK_LOOP,
    START_PLAYBACK,
    PLAY_PIANO_KEY,
    STOP_PIANO_KEY,
} from './const';
import { Action } from 'store/index';
import { AudioRange } from 'util/audiorange';
import { Tempo } from 'store/project';
import { PianoKey } from 'util/sound';
import { Instrument } from 'store/instrument';

export type StopPianoKeyAction = Action<{
    instrument: Instrument<any>;
    key: PianoKey;
}>
export function stopPianoKey(instrument: Instrument<any>, key: PianoKey): StopPianoKeyAction {
    return {
        type: STOP_PIANO_KEY,
        payload: {
            instrument,
            key,
        },
    }
}

export type PlayPianoKeyAction = Action<{
    audioContext: BaseAudioContext;
    instrument: Instrument<any>;
    key: PianoKey
    tempo: Tempo;
}>
export function playPianoKey(audioContext: BaseAudioContext, instrument: Instrument<any>, key: PianoKey, tempo: Tempo): PlayPianoKeyAction {
    return {
        type: PLAY_PIANO_KEY,
        payload: {
            audioContext,
            instrument,
            key,
            tempo,
        }
    }
}

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
