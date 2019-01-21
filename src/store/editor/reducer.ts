import { Time, timeZero } from './../../util/time';
import { AudioRange } from './../../util/audiorange';
import { Record } from 'immutable';
import { SET_EDITOR_FRAME } from './const';
import { SetEditorFrameAction } from './action';

interface Frame {
    height: number;
    width: number;
}

export class EditorState extends Record({
    visibleRange: new AudioRange(
        timeZero,
        Time.fromSeconds(10)
    ),
    end: Time.fromSeconds(30),
    frame: null,
    cursor: Time.fromSeconds(1),
    virtualCursor: Time.fromSeconds(2),
    quanitization: 1 / 4
}) {
    visibleRange: AudioRange;
    end: Time;
    frame: Frame | null;
    cursor: Time;
    virtualCursor: Time;
    quanitization: number;
}

function setEditorFrameReducer(state: EditorState, action: SetEditorFrameAction) {
    const { height, width } = action.payload;
    const frame: Frame = {
        height,
        width,
    };
    return state.set('frame', frame);
}


export function reducer(state = new EditorState(), action) {
    switch (action.type) {
        case SET_EDITOR_FRAME:
            return setEditorFrameReducer(state, action);
    }
    return state;
}
