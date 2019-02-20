import { Record, Map as ImmutableMap } from 'immutable';
import { Loop, LoopDataTypes, LoopPlayState } from './index';
import { DELETE_INSTRUMENT } from 'store/instrument/const';
import { DeleteInstrumentAction } from 'store/instrument/action';
import {
    CREATE_LOOP_NOTE,
    DELETE_LOOP_NOTE,
    SET_LOOP_NOTE_RANGE,
    SET_LOOP_RANGE,
    SET_LOOP_PLAY_STATE,
    SET_LOOP_NOTE_KEY,
    CREATE_LOOP,
} from './const';
import {
    STOP_LOOP,
} from 'store/player/const';
import { CreateLoopNoteAction, DeleteLoopNoteAction, SetLoopNoteRangeAction, SetLoopRangeAction, SetLoopCurrentTimeAction, SetLoopPlayStateAction, SetLoopNoteKeyAction, CreateLoopAction } from './action';
import { MidiNote } from 'util/sound';
import { InstrumentType } from 'store/instrument/types';
import { DrumMachineLoopData } from 'store/instrument/nodes/DrumMachine';
import { createBeat } from 'util/time';
import { SynthLoopData } from 'store/instrument/nodes/Synth';
import { StopLoopAction } from 'store/player/action';
import { NoiseSynthLoopData } from 'store/instrument/nodes/NoiseSynth';
import { AMSynthLoopData } from 'store/instrument/nodes/AMSynth';
import { DuoSynthLoopData } from 'store/instrument/nodes/DuoSynth';
import { FMSynthLoopData } from 'store/instrument/nodes/FMSynth';
import { MonoSynthLoopData } from 'store/instrument/nodes/MonoSynth';
import { PluckSynthLoopData } from 'store/instrument/nodes/PluckSynth';
import { MetalSynthLoopData } from 'store/instrument/nodes/MetalSynth';
import { MembraneSynthLoopData } from 'store/instrument/nodes/MembraneSynth';

export class LoopState extends Record<{
    items: ImmutableMap<string, Loop>
}>({
    items: ImmutableMap(),
}) {}

function getDefaultInstrumentLoopData(type: InstrumentType): LoopDataTypes {
    switch(type) {
        case InstrumentType.DrumMachine:
            return new DrumMachineLoopData({
                resolution: createBeat(1 / 4)
            });
        case InstrumentType.Synth:
            return new SynthLoopData({});
        case InstrumentType.NoiseSynth:
            return new NoiseSynthLoopData({});
        case InstrumentType.AMSynth:
            return new AMSynthLoopData({});
        case InstrumentType.DuoSynth:
            return new DuoSynthLoopData({});
        case InstrumentType.FMSynth:
            return new FMSynthLoopData({});
        case InstrumentType.MonoSynth:
            return new MonoSynthLoopData({});
        case InstrumentType.PluckSynth:
            return new PluckSynthLoopData({});
        case InstrumentType.MetalSynth:
            return new MetalSynthLoopData({});
        case InstrumentType.MembraneSynth:
            return new MembraneSynthLoopData({});
    }

    throw new Error('Not implemented');
}

function createLoopReducer(state: LoopState, action: CreateLoopAction): LoopState {
    const { loopId, instrumentId, instrumentType } = action.payload;

    const data = getDefaultInstrumentLoopData(instrumentType);
    const loop = new Loop({
        instrumentId,
        id: loopId,
        data,
    });
    return state.setIn(['items', loopId], loop);
}

function createLoopNoteReducer(state: LoopState, action: CreateLoopNoteAction): LoopState {
    const { loopId, pianoKey, noteId, range } = action.payload;
    const note: MidiNote = {
        id: noteId,
        range,
        pianoKey,
        velocity: 1,
    }
    return state.setIn(['items', loopId, 'notes', noteId], note);
}

function deleteLoopNoteReducer(state: LoopState, action: DeleteLoopNoteAction): LoopState {
    const { loopId, noteId } = action.payload;
    return state.deleteIn(['items', loopId, 'notes', noteId]);
}

function setLoopNoteRangeReduer(state: LoopState, action: SetLoopNoteRangeAction): LoopState {
    const { loopId, noteId, range } = action.payload;
    return state.setIn(['items', loopId, 'notes', noteId, 'range'], range);
}

function setLoopRangeReducer(state: LoopState, action: SetLoopRangeAction): LoopState {
    const { loopId, range } = action.payload;
    return state.setIn(['items', loopId, 'range'], range);
}

function setLoopPlayStateReducer(state: LoopState, action: SetLoopPlayStateAction): LoopState {
    const { loopId, playState } = action.payload;
    return state.setIn(['items', loopId, 'playState'], playState);
}

function stopLoopReducer(state: LoopState, action: StopLoopAction): LoopState {
    const { loopId } = action.payload;
    return state.mergeIn(['items', loopId], {
        currentTime: null,
        playState: LoopPlayState.STOPPED,
    });
}

function deleteInstrumentReducer(state: LoopState, action: DeleteInstrumentAction): LoopState {
    const { loopIds } = action.payload;
    return state.update('items', (loopItems) => {
        return loopIds.reduce((seed: LoopState['items'], loopId: string) => {
            return seed.delete(loopId);
        }, loopItems);
    })
}

function setLoopNoteKeyReducer(state: LoopState, action: SetLoopNoteKeyAction): LoopState {
    const { loopId, pianoKey, noteId } = action.payload;
    return state.setIn(['items', loopId, 'notes', noteId, 'pianoKey'], pianoKey);
}

export function reducer(state = new LoopState(), action) {
    switch(action.type) {
        case CREATE_LOOP:
            return createLoopReducer(state, action);
        case CREATE_LOOP_NOTE:
            return createLoopNoteReducer(state, action);
        case DELETE_LOOP_NOTE:
            return deleteLoopNoteReducer(state, action);
        case SET_LOOP_NOTE_RANGE:
            return setLoopNoteRangeReduer(state, action);
        case SET_LOOP_RANGE:
            return setLoopRangeReducer(state, action);
        case SET_LOOP_PLAY_STATE:
            return setLoopPlayStateReducer(state, action);
        case STOP_LOOP:
            return stopLoopReducer(state, action);
        case DELETE_INSTRUMENT:
            return deleteInstrumentReducer(state, action);
        case SET_LOOP_NOTE_KEY:
            return setLoopNoteKeyReducer(state, action);
    }
    return state;
}
