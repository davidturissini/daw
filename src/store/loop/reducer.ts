import { Record, Map as ImmutableMap } from 'immutable';
import { Loop, LoopDataTypes } from './index';
import { CREATE_INSTRUMENT } from 'store/instrument/const';
import { CreateInstrumentAction } from 'store/instrument/action';
import { CREATE_LOOP_NOTE, DELETE_LOOP_NOTE, SET_LOOP_NOTE_RANGE } from './const';
import { CreateLoopNoteAction, DeleteLoopNoteAction, SetLoopNoteRangeAction } from './action';
import { MidiNote } from 'util/sound';
import { InstrumentType } from 'store/instrument/types';
import { DrumMachineLoopData } from 'store/instrument/nodes/DrumMachine';
import { Beat } from 'util/time';
import { SynthLoopData } from 'store/instrument/nodes/Synth';

export class LoopState extends Record<{
    items: ImmutableMap<string, Loop>
}>({
    items: ImmutableMap(),
}) {}

function getDefaultInstrumentLoopData(type: InstrumentType): LoopDataTypes {
    if (type === InstrumentType.DrumMachine) {
        return new DrumMachineLoopData({
            resolution: new Beat(1 / 4)
        });
    } else if (type === InstrumentType.Synth) {
        return new SynthLoopData({});
    }

    throw new Error('Not implemented');
}

function createInstrumentReducer(state: LoopState, action: CreateInstrumentAction<any>): LoopState {
    const { loopId, id, type } = action.payload;

    const data = getDefaultInstrumentLoopData(type);
    const loop = new Loop({
        instrumentId: id,
        id: loopId,
        data,
    });
    return state.setIn(['items', loopId], loop);
}

function createLoopNoteReducer(state: LoopState, action: CreateLoopNoteAction): LoopState {
    const { loopId, keyId, noteId, range } = action.payload;
    const note: MidiNote = {
        id: noteId,
        range,
        note: keyId,
        velocity: 1,
    }
    return state.setIn(['items', loopId, 'notes', keyId, noteId], note);
}

function deleteLoopNoteReducer(state: LoopState, action: DeleteLoopNoteAction): LoopState {
    const { loopId, keyId, noteId } = action.payload;
    return state.deleteIn(['items', loopId, 'notes', keyId, noteId]);
}

function setLoopNoteRangeReduer(state: LoopState, action: SetLoopNoteRangeAction): LoopState {
    const { loopId, keyId, noteId, range } = action.payload;
    return state.setIn(['items', loopId, 'notes', keyId, noteId, 'range'], range);
}

export function reducer(state = new LoopState(), action) {
    switch(action.type) {
        case CREATE_INSTRUMENT:
            return createInstrumentReducer(state, action);
        case CREATE_LOOP_NOTE:
            return createLoopNoteReducer(state, action);
        case DELETE_LOOP_NOTE:
            return deleteLoopNoteReducer(state, action);
        case SET_LOOP_NOTE_RANGE:
            return setLoopNoteRangeReduer(state, action);
    }
    return state;
}
