import {
    CREATE_TRACK,
    SET_TRACK_INSTRUMENT,
    SET_TRACK_RECT,
} from './const';
import { Action } from './../index';

export type SetTrackRectAction = Action<{
    trackId: string;
    x: number;
    y: number;
    width: number;
    height: number;
}>
export function setTrackRect(trackId: string, x: number, y: number, width: number, height: number): SetTrackRectAction {
    return {
        type: SET_TRACK_RECT,
        payload: {
            trackId,
            x,
            y,
            width,
            height,
        }
    }
}

export type SetTrackInstrumentAction = Action<{
    trackId: string;
    instrumentId: string;
}>

export function setTrackInstrument(trackId: string, instrumentId: string): SetTrackInstrumentAction {
    return {
        type: SET_TRACK_INSTRUMENT,
        payload: {
            trackId,
            instrumentId,
        },
    }
}

export type CreateTrackAction = Action<{
    id: string,
    title: string;
}>

export function createTrack(id: string, title: string) {
    return {
        type: CREATE_TRACK,
        payload: {
            id,
            title,
        }
    }
}
