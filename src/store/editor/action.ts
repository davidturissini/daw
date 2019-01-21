import { Action } from 'store/index';
import {
    SET_EDITOR_FRAME,
    SET_VIRTUAL_CURSOR_TIME,
    SET_CURSOR_TIME,
    SET_VISIBLE_RANGE,
} from './const';
import { Time } from 'util/time';
import { AudioRange } from 'util/audiorange';

export type SetVisibleRangeAction = Action<{
    range: AudioRange;
}>
export function setVisibleRange(range: AudioRange): SetVisibleRangeAction {
    return {
        type: SET_VISIBLE_RANGE,
        payload: {
            range,
        }
    }
}

export type SetCursorTimeAction = Action<{
    time: Time | null;
}>
export function setCursorTime(time: Time | null): SetCursorTimeAction {
    return {
        type: SET_CURSOR_TIME,
        payload: {
            time,
        }
    }
}

export type SetVirtualCursorTimeAction = Action<{
    time: Time | null;
}>
export function setVirtualCursorTime(time: Time | null): SetVirtualCursorTimeAction {
    return {
        type: SET_VIRTUAL_CURSOR_TIME,
        payload: {
            time,
        }
    }
}

export type SetEditorFrameAction = Action<{
    height: number;
    width: number;
}>

export function setEditorFrame(height: number, width: number): SetEditorFrameAction {
    return {
        type: SET_EDITOR_FRAME,
        payload: {
            height,
            width,
        }
    }
}
