import { Record, Map as ImmutableMap } from 'immutable';
import { Loop } from './index';
import { CREATE_INSTRUMENT } from 'store/instrument/const';
import { CreateInstrumentAction } from 'store/instrument/action';

export class LoopState extends Record<{
    items: ImmutableMap<string, Loop>
}>({
    items: ImmutableMap(),
}) {}

function createInstrumentReducer(state: LoopState, action: CreateInstrumentAction): LoopState {
    const { loopId, id } = action.payload;
    const loop = new Loop({
        instrumentId: id,
        id: loopId,
    });
    return state.setIn(['items', loopId], loop);
}

export function reducer(state = new LoopState(), action) {
    switch(action.type) {
        case CREATE_INSTRUMENT:
            return createInstrumentReducer(state, action);
    }
    return state;
}
