import { Action } from './../index';
import { InstrumentType } from './types/index';
import {
    CREATE_INSTRUMENT,
} from './const';
import { InstrumentData } from './index';

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
