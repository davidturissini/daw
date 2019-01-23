import { Record, Map as ImmutableMap } from 'immutable';
import { Piano } from './index';
import { CREATE_PIANO } from './const';
import { CreatePianoAction } from './action';

export class PianoState extends Record<{
    items: ImmutableMap<string, Piano>
}>({
    items: ImmutableMap(),
}) {

}

function createPianoReducer(state: PianoState, action: CreatePianoAction): PianoState {
    const { id, instrumentId } = action.payload;
    const piano = new Piano({
        id,
        instrumentId
    });
    return state.setIn(['items', id], piano);
}

export function reducer(state = new PianoState(), action) {
    switch(action.type) {
        case CREATE_PIANO:
            return createPianoReducer(state, action);
    }
    return state;
}
