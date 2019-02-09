import { Record, Map as ImmutableMap } from 'immutable';
import { AudioSegment } from './index';
import {
    CREATE_AUDIO_SEGMENT,
    SET_AUDIO_SEGMENT_RANGE,
    MOVE_SEGMENT,
    ADD_NOTE,
    SET_NOTE_RANGE,
} from './const';
import { CreateAudioSegmentAction, SetAudioSegmentRangeAction, MoveSegmentAction, AddNoteAction, SetNoteRangeAction } from './action';
import { timeZero } from 'util/time';
import { AudioRange } from 'util/audiorange';
import { MidiNote } from 'util/sound';

export class AudioSegmentState extends Record<{
    items: ImmutableMap<string, AudioSegment>;
}>({
    items: ImmutableMap(),
}) {}

function createAudioSegmentReducer(state: AudioSegmentState, action: CreateAudioSegmentAction) {
    const { id, trackId, range } = action.payload;
    const segment = new AudioSegment({
        id,
        trackId,
        range,
    });
    return state.setIn(['items', id], segment);
}

function setAudioSegmentRangeReducer(state: AudioSegmentState, action: SetAudioSegmentRangeAction): AudioSegmentState {
    const { range, id } = action.payload;
    return state.setIn(['items', id, 'range'], range);
}

function moveSegmentReducer(state: AudioSegmentState, action: MoveSegmentAction): AudioSegmentState {
    const { segmentId, time } = action.payload;
    const segment = state.items.get(segmentId) as AudioSegment;
    const newOffset = segment.range.start.plus(time).lessThan(timeZero) ? timeZero : segment.range.start.plus(time);
    const newRange = {
        start: newOffset,
        duration: segment.range.duration,
    };
    return state.setIn(['items', segmentId, 'range'], newRange);
}

function addNoteReducer(state: AudioSegmentState, action: AddNoteAction): AudioSegmentState {
    const { segmentId, octave, range, noteId } = action.payload;
    const note: MidiNote = {
        id: noteId,
        range,
        note: octave,
    };
    return state.setIn(['items', segmentId, 'notes', octave, noteId], note);
}

function setNoteRangeReducer(state: AudioSegmentState, action: SetNoteRangeAction): AudioSegmentState {
    const { segmentId, octave, noteId, range } = action.payload;
    return state.setIn(['items', segmentId, 'notes', octave, noteId, 'range'], range);
}

export function reducer(state = new AudioSegmentState(), action) {
    switch(action.type) {
        case CREATE_AUDIO_SEGMENT:
            return createAudioSegmentReducer(state, action);
        case SET_AUDIO_SEGMENT_RANGE:
            return setAudioSegmentRangeReducer(state, action);
        case MOVE_SEGMENT:
            return moveSegmentReducer(state, action);
        case ADD_NOTE:
            return addNoteReducer(state, action);
        case SET_NOTE_RANGE:
            return setNoteRangeReducer(state, action);
    }
    return state;
}
