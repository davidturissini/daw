import { Action } from './../index';
import { InstrumentType } from './types/index';
import {
    CREATE_INSTRUMENT,
    SET_DRUM_MACHINE_SWITCH_ON_OFF,
} from './const';
import { InstrumentDataTypes } from './index';

export type SetDrumMachineSwitchOnOffAction = Action<{
    instrumentId: string;
    switchIndex: number;
    sampleIndex: number;
    value: boolean;
}>

export function setDrumMachineSwitchOnOff(instrumentId: string, switchIndex: number, sampleIndex: number, value: boolean): SetDrumMachineSwitchOnOffAction {
    return {
        type: SET_DRUM_MACHINE_SWITCH_ON_OFF,
        payload: {
            instrumentId,
            switchIndex,
            sampleIndex,
            value,
        }
    }
}

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
