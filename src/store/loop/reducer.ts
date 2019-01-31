import { Record, Map as ImmutableMap } from 'immutable';
import { Loop, LoopDataTypes } from './index';
import { CREATE_INSTRUMENT } from 'store/instrument/const';
import { CreateInstrumentAction } from 'store/instrument/action';
import { CREATE_LOOP_NOTE } from './const';
import { CreateLoopNoteAction } from './action';
import { MidiNote } from 'util/sound';
import { InstrumentType } from 'store/instrument/types';
import { DrumMachineLoopData } from 'store/instrument/types/DrumMachine';
import { Beat } from 'util/time';

export class LoopState extends Record<{
    items: ImmutableMap<string, Loop<any>>
}>({
    items: ImmutableMap(),
}) {}

function getDefaultInstrumentLoopData(type: InstrumentType): LoopDataTypes {
    if (type === InstrumentType.DrumMachine) {
        return new DrumMachineLoopData({
            resolution: new Beat(1 / 4)
        });
    }

    throw new Error('Not implemented');
}

function createInstrumentReducer(state: LoopState, action: CreateInstrumentAction): LoopState {
    const { loopId, id, type } = action.payload;

    const data = getDefaultInstrumentLoopData(type);
    const loop = new Loop({
        instrumentId: id,
        id: loopId,
        data,
    });
    return state.setIn(['items', loopId], loop);
}

function createLoopNoteReducer(state: LoopState, action: CreateLoopNoteAction<any>): LoopState{
    const { loopId, keyId, noteId, range } = action.payload;
    const note: MidiNote = {
        id: noteId,
        range,
        note: keyId,
    }
    return state.setIn(['items', loopId, 'notes', keyId, noteId], note);
}

export function reducer(state = new LoopState(), action) {
    switch(action.type) {
        case CREATE_INSTRUMENT:
            return createInstrumentReducer(state, action);
        case CREATE_LOOP_NOTE:
            return createLoopNoteReducer(state, action);
    }
    return state;
}
