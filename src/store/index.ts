import { Store, combineReducers, createStore, applyMiddleware, Middleware } from 'redux';
import { createLogger } from 'redux-logger'
import { register } from 'wire-service';
import { ValueChangedEvent } from 'wire-service';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

// Reducers
import { reducer as audioTrackReducer, AudioTrackState } from './audiotrack/reducer';
import { reducer as instrumentReducer, InstrumentState } from './instrument/reducer';
import { reducer as editorReducer, EditorState } from './editor/reducer';
import { reducer as audioSegmentReducer, AudioSegmentState } from './audiosegment/reducer';
import { reducer as audioSourceReducer, AudioSourceState } from './audiosource/reducer';
import { reducer as projectReducer, ProjectState } from './project/reducer';
import { reducer as routerReducer, RouterState } from './route/reducer';
import { reducer as pianoReducer, PianoState } from './piano/reducer';
import { reducer as audioWindowReducer, AudioWindowState } from './audiowindow/reducer';

// Epics
import { createRouterEpic, navigateEpic } from './route/epic';
import { playKeyEpic } from './piano/epic';

const { keys } = Object;

const rootEpic = combineEpics(
    createRouterEpic,
    navigateEpic,
    playKeyEpic,
);
const epicMiddleware = createEpicMiddleware();
const middleware: Middleware[] = [epicMiddleware];


if (process.env.NODE_ENV !== 'production') {
    middleware.push(
        createLogger({
            predicate: (getState, action) => {
                return (
                    action.type !== 'SET_VIRTUAL_CURSOR_TIME' &&
                    action.type !== 'SET_AUDIO_WINDOW_VISIBLE_RANGE'
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
    audiosegment: AudioSegmentState;
    audiosource: AudioSourceState;
    project: ProjectState;
    router: RouterState;
    piano: PianoState;
    audiowindow: AudioWindowState;
}

export const appStore = createStore(
    combineReducers({
        audiowindow: audioWindowReducer,
        audiotrack: audioTrackReducer,
        instrument: instrumentReducer,
        editor: editorReducer,
        audiosegment: audioSegmentReducer,
        audiosource: audioSourceReducer,
        project: projectReducer,
        router: routerReducer,
        piano: pianoReducer,
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



