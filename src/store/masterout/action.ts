import { Action } from 'store/index';
import { Decibel } from 'units/decibel';
import {
    SET_MASTER_OUT_GAIN,
    SET_MASTER_OUT_METER_LEVEL,
} from './const';

export type SetMasterOutMeterLevelAction = Action<{
    level: Decibel;
}>
export function setMasterOutMeterLevel(level: Decibel): SetMasterOutMeterLevelAction {
    return {
        type: SET_MASTER_OUT_METER_LEVEL,
        payload: {
            level,
        }
    }
}

export type SetMasterOutGainAction = Action<{
    gain: Decibel;
}>
export function setMasterOutGain(gain: Decibel): SetMasterOutGainAction {
    return {
        type: SET_MASTER_OUT_GAIN,
        payload: {
            gain,
        }
    }
}
