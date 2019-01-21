import { Record, Map as ImmutableMap } from 'immutable';
import { AudioTrack, Rect } from './index';
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

export function reducer(state = new AudioTrackState(), action) {
    switch(action.type) {
        case CREATE_TRACK:
            return createTrackReducer(state, action);
        case SET_TRACK_INSTRUMENT:
            return setTrackInsertumentReducer(state, action);
        case SET_TRACK_RECT:
            return setTrackRectReducer(state, action);
    }
    return state;
}
