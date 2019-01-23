import {
    CREATE_PIANO,
    PLAY_KEY,
    STOP_KEY,
    STOP_PIANO,
} from './const';
import { Action } from 'store/index';

export type StopPianoAction = Action<{
    pianoId: string;
}>
export function stopPiano(pianoId: string): StopPianoAction {
    return {
        type: STOP_PIANO,
        payload: {
            pianoId,
        }
    }
}

export type StopKeyAction = Action<{
    name: string;
    pianoId: string;
}>

export function stopKey(pianoId: string, name: string): StopKeyAction {
    return {
        type: STOP_KEY,
        payload: {
            pianoId,
            name,
        }
    }
}

export type CreatePianoAction = Action<{
    id: string;
    instrumentId: string;
}>
export function createPiano(id: string, instrumentId: string): CreatePianoAction {
    return {
        type: CREATE_PIANO,
        payload: {
            id,
            instrumentId,
        }
    }
}

export type PlayKeyAction = Action<{
    name: string;
    frequency: number;
    pianoId: string;
}>

export function playKey(pianoId: string, name: string, frequency: number): PlayKeyAction {
    return {
        type: PLAY_KEY,
        payload: {
            name,
            frequency,
            pianoId,
        },
    }
}
