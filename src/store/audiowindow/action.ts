import {
    CREATE_AUDIO_WINDOW,
    SET_AUDIO_WINDOW_VISIBLE_RANGE,
 } from './const';
import { Action } from 'store/index';
import { Rect } from 'util/geometry';
import { AudioRange } from 'util/audiorange';
import { Time, Beat } from 'util/time';

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
    rect: Rect;
    quanitization: Beat;
    visibleRange: AudioRange;
}>

export function createAudioWindow(id: string, rect: Rect, quanitization: Beat, visibleRange: AudioRange): CreateAudioWindowAction {
    return {
        type: CREATE_AUDIO_WINDOW,
        payload: {
            id,
            rect,
            quanitization,
            visibleRange,
        }
    }
}
