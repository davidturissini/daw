import { Record, Map as ImmutableMap } from 'immutable';
import { AudioTrack } from './index';
import {
    CreateTrackAction,
    SetTrackInstrumentAction,
    SetTrackRectAction,
} from './action';
import {
    CREATE_TRACK,
    SET_TRACK_INSTRUMENT,
    SET_TRACK_RECT,
} from './const';
import { CREATE_INSTRUMENT } from 'store/instrument/const';
import { Rect } from 'util/geometry';
import { CREATE_AUDIO_SEGMENT } from 'store/audiosegment/const';
import { CreateAudioSegmentAction } from 'store/audiosegment/action';
import { CreateInstrumentAction } from 'store/instrument/action';

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

function createInstrumentReducer(state: AudioTrackState, action: CreateInstrumentAction<any>): AudioTrackState {
    const { type, audioTrackId } = action.payload;
    const track = new AudioTrack({
        id: audioTrackId,
        title: type
    });
    return state.setIn(['items', audioTrackId], track);
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
        case CREATE_INSTRUMENT:
            return createInstrumentReducer(state, action);
    }
    return state;
}
