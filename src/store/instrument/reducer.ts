import { Record, Map as ImmutableMap, List } from 'immutable';
import { Instrument } from './index';
import {
    CreateInstrumentAction, SetDrumMachineSwitchOnOffAction,
} from './action';
import {
    CREATE_INSTRUMENT,
    SET_DRUM_MACHINE_SWITCH_ON_OFF,
} from './const';

export class InstrumentState extends Record({
    items: ImmutableMap(),
}) {
    items: ImmutableMap<string, Instrument<any>>
}

function createInstrumentReducer(state: InstrumentState, action: CreateInstrumentAction) {
    const { id, type, data, loopId, title } = action.payload;
    const instrument = new Instrument({
        title,
        id,
        type,
        data,
        loops: List([loopId])
    });

    return state.setIn(['items', id], instrument);
}

function setDrumMachineSwitchOnOffReducer(state: InstrumentState, action: SetDrumMachineSwitchOnOffAction): InstrumentState {
    const { instrumentId, switchIndex, sampleIndex, value } = action.payload;
    return state.setIn(['items', instrumentId, 'data', 'samples', sampleIndex, 'switches', switchIndex, 'onOff'], value);
}

export function reducer(state = new InstrumentState(), action) {
    switch(action.type) {
        case CREATE_INSTRUMENT:
            return createInstrumentReducer(state, action);
        case SET_DRUM_MACHINE_SWITCH_ON_OFF:
            return setDrumMachineSwitchOnOffReducer(state, action);
    }
    return state;
}
