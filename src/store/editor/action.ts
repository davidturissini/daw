import { Action } from 'store/index';
import { SET_EDITOR_FRAME } from './const';

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
