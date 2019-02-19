import {
    CREATE_LOOP_NOTE,
    DELETE_LOOP_NOTE,
    SET_LOOP_NOTE_RANGE,
    SET_LOOP_RANGE,
    SET_LOOP_CURRENT_TIME,
    SET_LOOP_PLAY_STATE,
    SET_LOOP_NOTE_KEY,
 } from './const';
import { Action } from 'store/index';
import { PianoKey } from 'util/sound';
import { TickRange, Tick } from 'store/tick';
import { LoopPlayState } from './index';

export type SetLoopNoteKeyAction = Action<{
    loopId: string;
    noteId: string;
    pianoKey: PianoKey;
}>

export function setLoopNoteKey(loopId: string, noteId: string, pianoKey: PianoKey): SetLoopNoteKeyAction {
    return {
        type: SET_LOOP_NOTE_KEY,
        payload: {
            loopId,
            noteId,
            pianoKey,
        }
    }
}

export type SetLoopPlayStateAction = Action<{
    loopId: string;
    playState: LoopPlayState;
}>

export function setLoopPlayState(loopId: string, playState: LoopPlayState): SetLoopPlayStateAction {
    return {
        type: SET_LOOP_PLAY_STATE,
        payload: {
            loopId,
            playState,
        }
    }
}

export type SetLoopCurrentTimeAction = Action<{
    loopId: string;
    currentTime: Tick;
}>

export function setLoopCurrentTime(loopId: string, currentTime: Tick): SetLoopCurrentTimeAction {
    return {
        type: SET_LOOP_CURRENT_TIME,
        payload: {
            loopId,
            currentTime,
        },
    }
}

export type SetLoopRangeAction = Action<{
    loopId: string;
    range: TickRange;
}>
export function setLoopRange(loopId: string, range: TickRange): SetLoopRangeAction {
    return {
        type: SET_LOOP_RANGE,
        payload: {
            loopId,
            range,
        }
    }
}

export type SetLoopNoteRangeAction = Action<{
    loopId: string;
    noteId: string;
    range: TickRange;
}>
export function setLoopNoteRange(loopId: string, noteId: string, range: TickRange): SetLoopNoteRangeAction {
    return {
        type: SET_LOOP_NOTE_RANGE,
        payload: {
            loopId,
            noteId,
            range,
        }
    }
}

export type DeleteLoopNoteAction = Action<{
    noteId: string;
    loopId: string;
}>
export function deleteLoopNote(loopId: string, noteId: string): DeleteLoopNoteAction {
    return {
        type: DELETE_LOOP_NOTE,
        payload: {
            loopId,
            noteId,
        }
    }
}

export type CreateLoopNoteAction = Action<{
    pianoKey: PianoKey;
    noteId: string;
    loopId: string;
    range: TickRange;
}>
export function createLoopNote(loopId: string, noteId: string, pianoKey: PianoKey, range: TickRange): CreateLoopNoteAction {
    return {
        type: CREATE_LOOP_NOTE,
        payload: {
            pianoKey,
            loopId,
            noteId,
            range,
        }
    }
}
