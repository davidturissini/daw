import { Record, Map as ImmutableMap } from 'immutable';
import { AudioTrack, Loop } from './index';
import {
    CreateTrackAction,
    SetTrackInstrumentAction,
    SetTrackRectAction,
    CreateTrackLoopAction,
    CreateTrackLoopNoteAction,
    SetTrackLoopNoteRangeAction,
    SetTrackLoopDurationAction,
} from './action';
import {
    CREATE_TRACK,
    SET_TRACK_INSTRUMENT,
    SET_TRACK_RECT,
    CREATE_TRACK_LOOP,
    CREATE_TRACK_LOOP_NOTE,
    SET_TRACK_LOOP_NOTE_RANGE,
    SET_TRACK_LOOP_DURATION,
} from './const';
import { CREATE_INSTRUMENT } from 'store/instrument/const';
import { Rect } from 'util/geometry';
import { CREATE_AUDIO_SEGMENT } from 'store/audiosegment/const';
import { CreateAudioSegmentAction } from 'store/audiosegment/action';
import { MidiNote } from 'util/sound';
import { CreateInstrumentAction } from 'store/instrument/action';
import { generateId } from 'util/uniqueid';

export class AudioTrackState extends Record({
    items: ImmutableMap(),
}) {
    items: ImmutableMap<string, AudioTrack>
}

function createTrackReducer(state: AudioTrackState, action: CreateTrackAction) {
    const { title, id } = action.payload;
    const audioTrack = new AudioTrack({
        title,
        id,
    });

    return state.setIn(['items', id], audioTrack);
}

function setTrackInsertumentReducer(state: AudioTrackState, action: SetTrackInstrumentAction) {
    const { trackId, instrumentId } = action.payload;

    return state.setIn(['items', trackId, 'instrumentId'], instrumentId);
}

function setTrackRectReducer(state: AudioTrackState, action: SetTrackRectAction) {
    const { x, y, height, width, trackId } = action.payload;
    const rect: Rect = {
        x,
        y,
        height,
        width,
    }
    return state.setIn(['items', trackId, 'rect'], rect);
}

function createAudioSegmentReducer(state: AudioTrackState, action: CreateAudioSegmentAction): AudioTrackState {
    const { trackId, id: segmentId } = action.payload;
    return state.updateIn(['items', trackId, 'segments'], (segments) => {
        return segments.push(segmentId);
    });
}

function createTrackLoopReducer(state: AudioTrackState, action: CreateTrackLoopAction): AudioTrackState {
    const { trackId, loopId } = action.payload;
    const loop = new Loop({
        id: loopId,
    });

    return state.setIn(['items', trackId, 'loops', loopId], loop);
}

function createTrackLoopNoteReducer(state: AudioTrackState, action: CreateTrackLoopNoteAction): AudioTrackState {
    const { trackId, loopId, noteId, range, octave } = action.payload;
    const note: MidiNote = {
        id: noteId,
        note: octave,
        range: range,
    };

    return state.setIn(['items', trackId, 'loops', loopId, 'notes', noteId], note);
}

function setTrackLoopNoteRangeReducer(state: AudioTrackState, action: SetTrackLoopNoteRangeAction): AudioTrackState {
    const { trackId, loopId, noteId, range } = action.payload;
    return state.setIn(['items', trackId, 'loops', loopId, 'notes', noteId, 'range'], range);
}

function setTrackLoopDurationReducer(state: AudioTrackState, action: SetTrackLoopDurationAction): AudioTrackState {
    const { trackId, loopId, duration } = action.payload;
    return state.setIn(['items', trackId, 'loops', loopId, 'duration'], duration);
}

function createInstrumentReducer(state: AudioTrackState, action: CreateInstrumentAction): AudioTrackState {
    const { id, type } = action.payload;
    const trackId = generateId();
    const track = new AudioTrack({
        id: trackId,
        instrumentId: id,
        title: type
    });
    return state.setIn(['items', trackId], track);
}

export function reducer(state = new AudioTrackState(), action) {
    switch(action.type) {
        case CREATE_TRACK:
            return createTrackReducer(state, action);
        case SET_TRACK_INSTRUMENT:
            return setTrackInsertumentReducer(state, action);
        case SET_TRACK_RECT:
            return setTrackRectReducer(state, action);
        case CREATE_AUDIO_SEGMENT:
            return createAudioSegmentReducer(state, action);
        case CREATE_TRACK_LOOP:
            return createTrackLoopReducer(state, action);
        case CREATE_TRACK_LOOP_NOTE:
            return createTrackLoopNoteReducer(state, action);
        case SET_TRACK_LOOP_NOTE_RANGE:
            return setTrackLoopNoteRangeReducer(state, action);
        case SET_TRACK_LOOP_DURATION:
            return setTrackLoopDurationReducer(state, action);
        case CREATE_INSTRUMENT:
            return createInstrumentReducer(state, action);
    }
    return state;
}
