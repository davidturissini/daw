import { Action } from './../index';
import { InstrumentType } from './index';
import { CREATE_INSTRUMENT } from './const';

export type CreateInstrumentAction<T> = Action<{
    type: InstrumentType,
    data: T;
    id: string;
}>

export function createInstrument<T>(id: string, type: InstrumentType, data: T): CreateInstrumentAction<T> {
    return {
        type: CREATE_INSTRUMENT,
        payload: {
            type,
            id,
            data,
        }
    };
}
