import { Record, Map as ImmutableMap, List } from 'immutable';
import { Instrument } from './index';
import {
    CreateInstrumentAction,
    SetInstrumentDataAction,
    DeleteInstrumentAction,
    SetInstrumentVolumeAction,
} from './action';
import {
    CREATE_INSTRUMENT,
    SET_INSTRUMENT_DATA,
    DELETE_INSTRUMENT,
    SET_INSTRUMENT_VOLUME,
} from './const';
import { CREATE_LOOP } from 'store/loop/const';
import { CreateLoopAction } from 'store/loop/action';
export class InstrumentState extends Record({
    items: ImmutableMap(),
}) {
    items: ImmutableMap<string, Instrument<any>>
}

function createInstrumentReducer(state: InstrumentState, action: CreateInstrumentAction<any>) {
    const { id, type, data, title } = action.payload;
    const instrument = new Instrument({
        title,
        id,
        type,
        data,
    });

    return state.setIn(['items', id], instrument);
}

function setInstrumentDataReducer(state: InstrumentState, action: SetInstrumentDataAction<any>): InstrumentState {
    const { instrumentId, data } = action.payload;

    return state.setIn(['items', instrumentId, 'data'], data);
}

function deleteInstrumentReducer(state: InstrumentState, action: DeleteInstrumentAction): InstrumentState {
    const { instrumentId } = action.payload;
    return state.deleteIn(['items', instrumentId]);
}

function setInstrumentVolumeReducer(state: InstrumentState, action: SetInstrumentVolumeAction): InstrumentState {
    const { instrumentId, volume } = action.payload;
    return state.setIn(['items', instrumentId, 'volume'], volume);
}

function createLoopReducer(state: InstrumentState, action: CreateLoopAction): InstrumentState {
    const { loopId, instrumentId } = action.payload;
    return state.updateIn(['items', instrumentId, 'loops'], (loopIds: List<string>) => {
        return loopIds.push(loopId)
    });
}

export function reducer(state = new InstrumentState(), action) {
    switch(action.type) {
        case CREATE_INSTRUMENT:
            return createInstrumentReducer(state, action);
        case SET_INSTRUMENT_DATA:
            return setInstrumentDataReducer(state, action);
        case DELETE_INSTRUMENT:
            return deleteInstrumentReducer(state, action);
        case SET_INSTRUMENT_VOLUME:
            return setInstrumentVolumeReducer(state, action);
        case CREATE_LOOP:
            return createLoopReducer(state, action);
    }
    return state;
}
