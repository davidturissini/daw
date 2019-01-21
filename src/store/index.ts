import { Store, combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import { register } from 'wire-service';
import { ValueChangedEvent } from 'wire-service';

// Reducers
import { reducer as audioTrackReducer, AudioTrackState } from './audiotrack/reducer';
import { reducer as instrumentReducer, InstrumentState } from './instrument/reducer';
import { reducer as editorReducer, EditorState } from './editor/reducer';

const { keys } = Object;

const middleware: any[] = [];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(
        createLogger({
            predicate: (getState, action) => {
                return (
                    action.type !== 'SET_VIRTUAL_CURSOR_TIME'
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
    audiotrack: AudioTrackState;
    instrument: InstrumentState;
    editor: EditorState;
}

export const appStore = createStore(
    combineReducers({
        audiotrack: audioTrackReducer,
        instrument: instrumentReducer,
        editor: editorReducer,
    }),
    applyMiddleware(...middleware),
);

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

function dispatchStoreData(store: Store, paths: ReduxWireConfig['paths'], eventTarget: EventTarget) {
    const state = store.getState();
    const data = keys(paths).reduce((seed, key) => {
        const path = [...paths[key]];
        const first = path.shift() as string;
        seed[key] = state[first].getIn(path);
        return seed;
    }, {});

    eventTarget.dispatchEvent(
        new ValueChangedEvent({ data })
    )
}

register(wireSymbol, function (eventTarget) {
    let unsubscribe: null | (() => void) = null;

    eventTarget.addEventListener('config', (config: ReduxWireConfig) => {
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }
        const { paths } = config;
        dispatchStoreData(appStore, paths, eventTarget);

        unsubscribe = appStore.subscribe(() => {
            dispatchStoreData(appStore, paths, eventTarget);
        });
    });
});



