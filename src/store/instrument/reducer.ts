import { Record, Map as ImmutableMap, List } from 'immutable';
import { Instrument } from './index';
import {
    CreateInstrumentAction,
} from './action';
import {
    CREATE_INSTRUMENT,
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

export function reducer(state = new InstrumentState(), action) {
    switch(action.type) {
        case CREATE_INSTRUMENT:
            return createInstrumentReducer(state, action);
    }
    return state;
}
