import {
    CREATE_AUDIO_WINDOW,
    SET_AUDIO_WINDOW_VISIBLE_RANGE,
 } from './const';
import { Action } from 'store/index';
import { Frame } from 'util/geometry';
import { AudioRange } from 'util/audiorange';

export type SetAudioWindowVisibleRangeAction = Action<{
    range: AudioRange;
    windowId: string;
}>
export function setAudioWindowVisibleRange(windowId: string, range: AudioRange): SetAudioWindowVisibleRangeAction {
    return {
        type: SET_AUDIO_WINDOW_VISIBLE_RANGE,
        payload: {
            range,
            windowId,
        }
    }
}

export type CreateAudioWindowAction = Action<{
    id: string;
    frame: Frame;
    quanitization: number;
    visibleRange: AudioRange;
}>

export function createAudioWindow(id: string, frame: Frame, quanitization: number, visibleRange: AudioRange): CreateAudioWindowAction {
    return {
        type: CREATE_AUDIO_WINDOW,
        payload: {
            id,
            frame,
            quanitization,
            visibleRange,
        }
    }
}
