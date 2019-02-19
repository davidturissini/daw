import { Action } from './../index';
import { InstrumentType } from './types';
import {
    CREATE_INSTRUMENT,
    SET_INSTRUMENT_DATA,
    DELETE_INSTRUMENT,
} from './const';
import { InstrumentData } from './index';
import { List } from 'immutable';

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
    loopId: string;
    audioTrackId: string;
    data: T;
}>

export function createInstrument<T extends InstrumentData>(id: string, title: string, type: InstrumentType, data: T, audioTrackId: string, loopId: string): CreateInstrumentAction<T> {
    return {
        type: CREATE_INSTRUMENT,
        payload: {
            title,
            audioTrackId,
            type,
            id,
            data,
            loopId,
        }
    };
}
