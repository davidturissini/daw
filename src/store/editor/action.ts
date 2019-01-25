import { Action } from 'store/index';
import {
    SET_EDITOR_FRAME,
    SET_VIRTUAL_CURSOR_TIME,
    SET_CURSOR_TIME,
} from './const';
import { Time } from 'util/time';

export type SetCursorTimeAction = Action<{
    time: Time;
}>
export function setCursorTime(time: Time): SetCursorTimeAction {
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
