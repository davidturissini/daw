import { Store, combineReducers, createStore, applyMiddleware, Middleware } from 'redux';
import { createLogger } from 'redux-logger'
import { register } from 'wire-service';
import { ValueChangedEvent } from 'wire-service';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

// Reducers
import { reducer as instrumentReducer, InstrumentState } from './instrument/reducer';
import { reducer as projectReducer, ProjectState } from './project/reducer';
import { reducer as routerReducer, RouterState } from './route/reducer';
import { reducer as loopReducer, LoopState } from './loop/reducer';
import { reducer as masterOutReducer, MasterOutState } from './masterout/reducer';

// Store Epics
import { createRouterEpic, navigateEpic } from './route/epic';
import { createProjectEpic } from './project/epic';
import { createInstrumentEpic as loopCreateInstrumentEpic } from './loop/epic';

// Audio Epics
import {
    createLoopEpic as audioCreateLoopEpic,
    playLoopEpic,
    deleteLoopNoteEpic,
    setLoopNoteRangeEpic,
    createLoopEpic,
    setLoopNoteKeyEpic,
    createLoopNoteEpic,
    setLoopRangeEpic,
} from 'audio/loop';
import {
    createInstrumentEpic as audioCreateInstrumentEpic,
    playPianoKeyEpic,
    setInstrumentVolumeEpic,
    setMasterOutGainEpic,
} from 'audio/instruments';

const { keys } = Object;

const rootEpic = combineEpics(
    createRouterEpic,
    navigateEpic,
    playLoopEpic,
    createProjectEpic,
    audioCreateInstrumentEpic,
    loopCreateInstrumentEpic,


    // audio epics
    audioCreateLoopEpic,
    deleteLoopNoteEpic,
    setLoopNoteRangeEpic,
    createLoopEpic,
    setLoopNoteKeyEpic,
    createLoopNoteEpic,
    setLoopRangeEpic,
    playPianoKeyEpic,
    setInstrumentVolumeEpic,
    setMasterOutGainEpic,
);
const epicMiddleware = createEpicMiddleware();
const middleware: Middleware[] = [epicMiddleware];


if (process.env.NODE_ENV !== 'production') {
    middleware.push(
        createLogger({
            predicate: (getState, action) => {
                return (
                    action.type !== 'SET_VIRTUAL_CURSOR_TIME' &&
                    action.type !== 'SET_AUDIO_WINDOW_VISIBLE_RANGE' &&
                    action.type !== 'SET_AUDIO_WINDOW_VIRTUAL_CURSOR_TIME' &&
                    action.type !== 'SET_LOOP_CURRENT_TIME' &&
                    action.type !== 'SET_MASTER_OUT_METER_LEVEL' &&
                    action.type !== 'SET_INSTRUMENT_VOLUME_METER_VALUE'
                );
            },
            stateTransformer: (state) => {
                const newState = {};
                for (const i of Object.keys(state)) {
                    if (state[i].toJS) {
                        newState[i] = state[i].toJS();
                    } else {
                        newState[i] = state[i];
                    }
                }
                return newState;
            },
        }),
    );
}

export interface AppState {
    instrument: InstrumentState;
    project: ProjectState;
    router: RouterState;
    loop: LoopState;
    masterout: MasterOutState;
}

export const appStore = createStore(
    combineReducers({
        instrument: instrumentReducer,
        project: projectReducer,
        router: routerReducer,
        loop: loopReducer,
        masterout: masterOutReducer,
    }),
    applyMiddleware(...middleware),
);
epicMiddleware.run(rootEpic);

export const wireSymbol = () => {}

export interface ReduxWireConfig {
    paths: {
        [key: string]: string[];
    }
}

export interface Action<T> {
    type: string;
    payload: T;
}

function createDispatchFunction() {
    let lastState: any | null = null;
    return function dispatchStoreData(store: Store, paths: ReduxWireConfig['paths'], eventTarget: EventTarget) {
        const state = store.getState();
        const data = keys(paths).reduce((seed, key) => {
            const path = [...paths[key]];
            const first = path.shift() as string;
            seed[key] = state[first].getIn(path);
            return seed;
        }, {});

        if (lastState !== null) {
            const keys = Object.keys(data);
            let haveNewData = false;
            for(let i = 0; i < keys.length; i += 1) {
                const key = keys[i];
                if (data[key] !== lastState[key]) {
                    haveNewData = true;
                }
            }
            if (haveNewData === false) {
                return;
            }
        }

        lastState = data;
        eventTarget.dispatchEvent(
            new ValueChangedEvent({ data })
        )
    }
}

register(wireSymbol, function (eventTarget) {
    let unsubscribe: null | (() => void) = null;

    eventTarget.addEventListener('config', (config: ReduxWireConfig) => {
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }
        const dispatchStoreData = createDispatchFunction();
        const { paths } = config;
        dispatchStoreData(appStore, paths, eventTarget);

        unsubscribe = appStore.subscribe(() => {
            dispatchStoreData(appStore, paths, eventTarget);
        });
    });
});



