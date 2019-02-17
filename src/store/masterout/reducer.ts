import { Record } from 'immutable';
import { Decibel, decibel } from 'units/decibel';
import { SET_MASTER_OUT_METER_LEVEL, SET_MASTER_OUT_GAIN } from './const';
import { SetMasterOutMeterLevelAction, SetMasterOutGainAction } from './action';

export class MasterOutState extends Record<{
    gain: Decibel;
    meter: Decibel;
}>({
    gain: decibel(0),
    meter: decibel(-100),
}) {

}

function setMasterOutMeterLevelReducer(state: MasterOutState, action: SetMasterOutMeterLevelAction): MasterOutState {
    const { level } = action.payload;
    return state.set('meter', level);
}

function setMasterOutGainReducer(state: MasterOutState, action: SetMasterOutGainAction): MasterOutState {
    const { gain } = action.payload;
    return state.set('gain', gain);
}


export function reducer(state = new MasterOutState(), action) {
    switch(action.type) {
        case SET_MASTER_OUT_METER_LEVEL:
            return setMasterOutMeterLevelReducer(state, action);
        case SET_MASTER_OUT_GAIN:
            return setMasterOutGainReducer(state, action);
    }
    return state;
}
