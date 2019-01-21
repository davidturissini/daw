import { Time, timeZero } from './../../util/time';
import { AudioRange } from './../../util/audiorange';
import { Record } from 'immutable';
import {
    SET_EDITOR_FRAME,
    SET_VIRTUAL_CURSOR_TIME,
    SET_CURSOR_TIME,
    SET_VISIBLE_RANGE,
} from './const';
import {
    SetEditorFrameAction,
    SetCursorTimeAction,
    SetVirtualCursorTimeAction,
    SetVisibleRangeAction,
} from './action';
import { Frame } from 'util/geometry';

export class EditorState extends Record<{
    visibleRange: AudioRange;
    end: Time;
    frame: Frame;
    cursor: Time;
    virtualCursor: Time;
    quanitization: number;
}>({
    visibleRange: new AudioRange(
        timeZero,
        Time.fromSeconds(10)
    ),
    end: Time.fromSeconds(30),
    frame: {
        height: 0,
        width: 0,
    },
    cursor: Time.fromSeconds(1),
    virtualCursor: Time.fromSeconds(2),
    quanitization: 1 / 4
}) {

}

function setEditorFrameReducer(state: EditorState, action: SetEditorFrameAction) {
    const { height, width } = action.payload;
    const frame: Frame = {
        height,
        width,
    };
    return state.set('frame', frame);
}

function setVirtualCursorTimeReducer(state: EditorState, action: SetVirtualCursorTimeAction) {
    const { time } = action.payload;
    return state.set('virtualCursor', time);
}

function setCursorTimeReducer(state: EditorState, action: SetCursorTimeAction) {
    const { time } = action.payload;
    return state.set('cursor', time);
}

function setVisibleRangeReducer(state: EditorState, action: SetVisibleRangeAction) {
    const { range } = action.payload;
    return state.set('visibleRange', range);
}

export function reducer(state = new EditorState(), action) {
    switch (action.type) {
        case SET_EDITOR_FRAME:
            return setEditorFrameReducer(state, action);
        case SET_VIRTUAL_CURSOR_TIME:
            return setVirtualCursorTimeReducer(state, action);
        case SET_CURSOR_TIME:
            return setCursorTimeReducer(state, action);
        case SET_VISIBLE_RANGE:
            return setVisibleRangeReducer(state, action);
    }
    return state;
}
