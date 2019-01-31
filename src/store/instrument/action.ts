import { Action } from './../index';
import { InstrumentType } from './types/index';
import {
    CREATE_INSTRUMENT,
} from './const';
import { InstrumentDataTypes } from './index';

export type CreateInstrumentAction = Action<{
    type: InstrumentType,
    title: string,
    id: string;
    loopId: string;
    audioTrackId: string;
    data: InstrumentDataTypes;
}>

export function createInstrument<T>(id: string, title: string, type: InstrumentType, data: InstrumentDataTypes, audioTrackId: string, loopId: string): CreateInstrumentAction {
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
