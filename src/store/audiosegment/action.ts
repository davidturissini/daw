import {
    CREATE_AUDIO_SEGMENT,
    SET_AUDIO_SEGMENT_RANGE,
    MOVE_SEGMENT,
    ADD_NOTE,
    SET_NOTE_RANGE,
} from './const';

import { Action } from 'store/index';
import { AudioRange } from 'util/audiorange';
import { Time } from 'util/time';

export type SetNoteRangeAction = Action<{
    segmentId: string;
    noteId: string;
    range: AudioRange;
    octave: string;
}>
export function setNoteRange(segmentId: string, octave: string, noteId: string, range: AudioRange): SetNoteRangeAction {
    return {
        type: SET_NOTE_RANGE,
        payload: {
            segmentId,
            noteId,
            range,
            octave,
        }
    }
}

export type AddNoteAction = Action<{
    noteId: string;
    segmentId: string;
    range: AudioRange;
    octave: string;
}>
export function addNote(segmentId: string, octave: string, noteId: string, range: AudioRange): AddNoteAction {
    return {
        type: ADD_NOTE,
        payload: {
            noteId,
            segmentId,
            range,
            octave,
        }
    }
}

export type MoveSegmentAction = Action<{
    segmentId: string;
    time: Time;
}>

export function moveSegment(segmentId: string, time: Time): MoveSegmentAction {
    return {
        type: MOVE_SEGMENT,
        payload: {
            segmentId,
            time,
        }
    }
}

export type SetAudioSegmentRangeAction = Action<{
    range: AudioRange;
    id: string;
}>

export function setAudioSegmentRange(id: string, range: AudioRange): SetAudioSegmentRangeAction {
    return {
        type: SET_AUDIO_SEGMENT_RANGE,
        payload: {
            id,
            range,
        }
    }
}

export type CreateAudioSegmentAction = Action<{
    id: string;
    trackId: string;
    range: AudioRange;
}>

export function createAudioSegment(id: string, trackId: string, range: AudioRange): CreateAudioSegmentAction {
    return {
        type: CREATE_AUDIO_SEGMENT,
        payload: {
            id,
            trackId,
            range,
        }
    }
}
