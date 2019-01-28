import { Record, Map as ImmutableMap } from 'immutable';
import { AudioWindow } from './index';
import {
    CREATE_AUDIO_WINDOW,
    SET_AUDIO_WINDOW_VISIBLE_RANGE,
} from './const';
import { CreateAudioWindowAction, SetAudioWindowVisibleRangeAction } from './action';

export class AudioWindowState extends Record<{
    items: ImmutableMap<string, AudioWindow>
}>({
    items: ImmutableMap(),
}) {}

function createAudioWindowReducer(state: AudioWindowState, action: CreateAudioWindowAction): AudioWindowState {
    const { id, rect, quanitization, visibleRange } = action.payload;
    const audioWindow = new AudioWindow({
        id,
        rect,
        quanitization,
        visibleRange,
    });
    return state.setIn(['items', id], audioWindow);
}

function setAudioWindowVisibleRangeReducer(state: AudioWindowState, action: SetAudioWindowVisibleRangeAction): AudioWindowState {
    const { windowId, range } = action.payload;
    return state.setIn(['items', windowId, 'visibleRange'], range);
}

export function reducer(state = new AudioWindowState(), action) {
    switch (action.type) {
        case CREATE_AUDIO_WINDOW:
            return createAudioWindowReducer(state, action);
        case SET_AUDIO_WINDOW_VISIBLE_RANGE:
            return setAudioWindowVisibleRangeReducer(state, action);
    }
    return state;
}
