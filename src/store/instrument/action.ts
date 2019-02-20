import { Action } from './../index';
import { InstrumentType } from './types';
import {
    CREATE_INSTRUMENT,
    SET_INSTRUMENT_DATA,
    DELETE_INSTRUMENT,
    SET_INSTRUMENT_VOLUME,
} from './const';
import { InstrumentData } from './index';
import { List } from 'immutable';
import { Decibel } from 'units/decibel';

export type SetInstrumentVolumeAction = Action<{
    instrumentId: string;
    volume: Decibel;
}>
export function setInstrumentVolume(instrumentId: string, volume: Decibel): SetInstrumentVolumeAction {
    return {
        type: SET_INSTRUMENT_VOLUME,
        payload: {
            instrumentId,
            volume,
        }
    }
}

export type DeleteInstrumentAction = Action<{
    instrumentId: string;
    loopIds: List<string>
}>
export function deleteInstrument(instrumentId: string, loopIds: List<string>): DeleteInstrumentAction {
    return {
        type: DELETE_INSTRUMENT,
        payload: {
            instrumentId,
            loopIds,
        }
    }
}

export type SetInstrumentDataAction<T extends InstrumentData> = Action<{
    instrumentId: string;
    data: T;
}>

export function setInstrumentData<T extends InstrumentData>(instrumentId: string, data: T): SetInstrumentDataAction<T> {
    return {
        type: SET_INSTRUMENT_DATA,
        payload: {
            instrumentId,
            data,
        }
    }
}

export type CreateInstrumentAction<T extends InstrumentData> = Action<{
    type: InstrumentType,
    title: string,
    id: string;
    audioTrackId: string;
    data: T;
}>

export function createInstrument<T extends InstrumentData>(id: string, title: string, type: InstrumentType, data: T, audioTrackId: string): CreateInstrumentAction<T> {
    return {
        type: CREATE_INSTRUMENT,
        payload: {
            title,
            audioTrackId,
            type,
            id,
            data,
        }
    };
}
