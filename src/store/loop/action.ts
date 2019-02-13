import {
    CREATE_LOOP_NOTE,
    DELETE_LOOP_NOTE,
    SET_LOOP_NOTE_RANGE,
    SET_LOOP_RANGE,
    SET_LOOP_CURRENT_TIME,
 } from './const';
import { Action } from 'store/index';
import { BeatRange } from 'util/audiorange';
import { PianoKey } from 'util/sound';
import { TickRange, Tick } from 'store/tick';
import Tone from 'tone';

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
    range: BeatRange;
    keyId: PianoKey;
}>
export function setLoopNoteRange(loopId: string, keyId: PianoKey, noteId: string, range: BeatRange): SetLoopNoteRangeAction {
    return {
        type: SET_LOOP_NOTE_RANGE,
        payload: {
            loopId,
            noteId,
            range,
            keyId,
        }
    }
}

export type DeleteLoopNoteAction = Action<{
    keyId: PianoKey;
    noteId: string;
    loopId: string;
}>
export function deleteLoopNote(loopId: string, noteId: string, keyId: PianoKey): DeleteLoopNoteAction {
    return {
        type: DELETE_LOOP_NOTE,
        payload: {
            loopId,
            noteId,
            keyId,
        }
    }
}

export type CreateLoopNoteAction = Action<{
    keyId: PianoKey;
    noteId: string;
    loopId: string;
    range: TickRange;
}>
export function createLoopNote(loopId: string, noteId: string, keyId: PianoKey, range: TickRange): CreateLoopNoteAction {
    return {
        type: CREATE_LOOP_NOTE,
        payload: {
            keyId,
            loopId,
            noteId,
            range,
        }
    }
}
