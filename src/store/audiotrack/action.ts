import {
    CREATE_TRACK,
    CREATE_TRACK_LOOP,
    SET_TRACK_INSTRUMENT,
    SET_TRACK_RECT,
    CREATE_TRACK_LOOP_NOTE,
    SET_TRACK_LOOP_NOTE_RANGE,
} from './const';
import { Action } from './../index';
import { AudioRange } from 'util/audiorange';

export type SetTrackLoopNoteRangeAction = Action<{
    trackId: string;
    loopId: string;
    noteId: string;
    range: AudioRange;
}>
export function setTrackLoopNoteRange(trackId: string, loopId: string, noteId: string, range: AudioRange): SetTrackLoopNoteRangeAction {
    return {
        type: SET_TRACK_LOOP_NOTE_RANGE,
        payload: {
            trackId,
            loopId,
            noteId,
            range,
        }
    }
}

export type CreateTrackLoopNoteAction = Action<{
    trackId: string;
    loopId: string;
    noteId: string;
    octave: string;
    range: AudioRange;
}>
export function createTrackLoopNote(trackId: string, octave: string, loopId: string, noteId: string, range: AudioRange): CreateTrackLoopNoteAction {
    return {
        type: CREATE_TRACK_LOOP_NOTE,
        payload: {
            trackId,
            octave,
            loopId,
            range,
            noteId,
        },
    }
}

export type CreateTrackLoopAction = Action<{
    loopId: string;
    trackId: string;
}>
export function createTrackLoop(trackId: string, loopId: string): CreateTrackLoopAction {
    return {
        type: CREATE_TRACK_LOOP,
        payload: {
            trackId,
            loopId,
        }
    }
}

export type SetTrackRectAction = Action<{
    trackId: string;
    x: number;
    y: number;
    width: number;
    height: number;
}>
export function setTrackRect(trackId: string, x: number, y: number, width: number, height: number): SetTrackRectAction {
    return {
        type: SET_TRACK_RECT,
        payload: {
            trackId,
            x,
            y,
            width,
            height,
        }
    }
}

export type SetTrackInstrumentAction = Action<{
    trackId: string;
    instrumentId: string;
}>

export function setTrackInstrument(trackId: string, instrumentId: string): SetTrackInstrumentAction {
    return {
        type: SET_TRACK_INSTRUMENT,
        payload: {
            trackId,
            instrumentId,
        },
    }
}

export type CreateTrackAction = Action<{
    id: string,
    title: string;
}>

export function createTrack(id: string, title: string) {
    return {
        type: CREATE_TRACK,
        payload: {
            id,
            title,
        }
    }
}
