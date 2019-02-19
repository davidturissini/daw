import { Record, Map as ImmutableMap, List } from 'immutable';
import { Instrument } from './index';
import {
    CreateInstrumentAction,
    SetInstrumentDataAction,
    DeleteInstrumentAction,
} from './action';
import {
    CREATE_INSTRUMENT,
    SET_INSTRUMENT_DATA,
    DELETE_INSTRUMENT,
} from './const';

export class InstrumentState extends Record({
    items: ImmutableMap(),
}) {
    items: ImmutableMap<string, Instrument<any>>
}

function createInstrumentReducer(state: InstrumentState, action: CreateInstrumentAction<any>) {
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

function setInstrumentDataReducer(state: InstrumentState, action: SetInstrumentDataAction<any>): InstrumentState {
    const { instrumentId, data } = action.payload;

    return state.setIn(['items', instrumentId, 'data'], data);
}

function deleteInstrumentReducer(state: InstrumentState, action: DeleteInstrumentAction): InstrumentState {
    const { instrumentId } = action.payload;
    return state.deleteIn(['items', instrumentId]);
}

export function reducer(state = new InstrumentState(), action) {
    switch(action.type) {
        case CREATE_INSTRUMENT:
            return createInstrumentReducer(state, action);
        case SET_INSTRUMENT_DATA:
            return setInstrumentDataReducer(state, action);
        case DELETE_INSTRUMENT:
            return deleteInstrumentReducer(state, action);
    }
    return state;
}
