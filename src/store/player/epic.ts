import {
    START_PLAYBACK,
    PLAY_TRACK_LOOP,
    PLAY_PIANO_KEY,
    STOP_PIANO_KEY,
    STOP_LOOP,
} from './const';
import { flatMap, filter, takeUntil, switchMap } from 'rxjs/operators';
import { StartPlaybackAction, PlayTrackLoopAction, PlayPianoKeyAction, StopPianoKeyAction, StopLoopAction } from './action';
import { empty as emptyObservable, empty, Observable, Subscription } from 'rxjs';
import { appStore } from '../index';
import { createInstrumentNode } from 'store/instrument';
import { MidiNote, getAudioContext } from 'util/sound';
import { timeZero, Time } from 'util/time';
import { Loop, LoopPlayState } from 'store/loop';

import { CREATE_INSTRUMENT, SET_INSTRUMENT_DATA } from 'store/instrument/const';
import { CreateInstrumentAction, SetInstrumentDataAction } from 'store/instrument/action';
import { InstrumentAudioNode } from 'store/instrument/types';
import { Tempo } from 'store/project';
import { timeToTick } from 'store/tick';
import { setLoopCurrentTime, SetLoopRangeAction, CreateLoopNoteAction, DeleteLoopNoteAction, SetLoopNoteRangeAction, setLoopPlayState } from 'store/loop/action';
import { SET_LOOP_RANGE, CREATE_LOOP_NOTE, DELETE_LOOP_NOTE, SET_LOOP_NOTE_RANGE } from 'store/loop/const';
import { LoopPlayer } from './LoopPlayer';
import { Transport } from 'tone';

Transport.PPQ = 960;

const instrumentNodes: { [key: string]: InstrumentAudioNode<any> } = {};
const loopPlayers: { [key: string]: LoopPlayer } = {};

export function createInstrumentEpic(actions) {
    return actions.ofType(CREATE_INSTRUMENT)
        .pipe(
            flatMap((action: CreateInstrumentAction<any>) => {
                const { id: instrumentId, data, type } = action.payload;
                const instrumentNode = createInstrumentNode(type, data);
                instrumentNodes[instrumentId] = instrumentNode;

                return Observable.create((o) => {
                    const subscription: Subscription = actions.ofType(SET_INSTRUMENT_DATA)
                        .pipe(
                            filter((action: SetInstrumentDataAction<any>) => {
                                return action.payload.instrumentId === instrumentId;
                            })
                        )
                        .subscribe((action: SetInstrumentDataAction<any>) => {
                            instrumentNode.update(action.payload.data);
                        });

                    return () => subscription.unsubscribe();
                })
            })
        )
}

export function playPianoKeyEpic(actions) {
    return actions.ofType(PLAY_PIANO_KEY)
        .pipe(
            flatMap((action: PlayPianoKeyAction) => {
                const { instrumentId, key } = action.payload;
                const instrumentNode = instrumentNodes[instrumentId];
                instrumentNode.connect(getAudioContext().destination);
                Observable.create((o) => {
                    instrumentNode.trigger(key, 1, timeZero, null, null)

                    return () => {
                        instrumentNode.release();
                    }
                })
                .pipe(
                    takeUntil(
                        actions.ofType(STOP_PIANO_KEY)
                            .pipe(
                                filter((action: StopPianoKeyAction) => {
                                    return action.payload.instrumentId === instrumentId && action.payload.key === key;
                                })
                            )
                    )
                )
                .subscribe(() => {

                })

                return empty();
            })
        )
}

export function playTrackLoopEpic(actions) {
    return actions.ofType(PLAY_TRACK_LOOP)
        .pipe(
            flatMap((action: PlayTrackLoopAction) => {
                const { audioContext, instrumentId, loopId, tempo } = action.payload;
                const { loop: loops } = appStore.getState();
                const loop = loops.items.get(loopId) as Loop;
                const instrumentNode = instrumentNodes[instrumentId];
                instrumentNode.connect(audioContext.destination);
                return Observable.create((o) => {
                    const player = loopPlayers[loopId] = new LoopPlayer(instrumentNode, loop.range, tempo);
                    const { loop: loops } = appStore.getState();
                    const innerLoop = loops.items.get(loopId) as Loop;

                    const flattenedNotes = innerLoop.notes.toList().toArray().reduce((seed: MidiNote[], noteMap) => {
                        return seed.concat(noteMap.toList().toArray());
                    }, []);
                    player.addNotes(flattenedNotes);

                    let when = timeZero;
                    if (Object.keys(loopPlayers).length === 1) {
                        Transport.start();
                    } else {
                        const p = loopPlayers[Object.keys(loopPlayers)[0]];
                        when = Time.fromSeconds(Transport.nextSubdivision('0:4:0'));
                    }

                    player.start(when);
                    o.next({ player });
                    return () => {
                        delete loopPlayers[loopId];
                        if (Object.keys(loopPlayers).length === 0) {
                            Transport.stop();
                        }
                    }
                })
                .pipe(
                    switchMap(({ player }: { player: LoopPlayer }) => {
                        return Observable.create((o) => {
                            const setLoopRangeSubscription = actions.ofType(SET_LOOP_RANGE)
                                .pipe(
                                    filter((action: SetLoopRangeAction) => {
                                        return action.payload.loopId === loopId;
                                    })
                                )
                                .subscribe((action: SetLoopRangeAction) => {
                                    player.setLoopRange(action.payload.range);
                                });

                            const createLoopNoteSubscription = actions.ofType(CREATE_LOOP_NOTE)
                                .pipe(
                                    filter((action: CreateLoopNoteAction) => {
                                        return action.payload.loopId === loopId;
                                    })
                                )
                                .subscribe((action: CreateLoopNoteAction) => {
                                    const midiNote: MidiNote = {
                                        note: action.payload.keyId,
                                        velocity: 1,
                                        id: action.payload.noteId,
                                        range: action.payload.range,
                                    }
                                    player.addNotes([midiNote]);
                                });

                            const setLoopNoteRangeSubscription = actions.ofType(SET_LOOP_NOTE_RANGE)
                                .pipe(
                                    filter((action: SetLoopNoteRangeAction) => {
                                        return action.payload.loopId === loopId;
                                    })
                                )
                                .subscribe((action: SetLoopNoteRangeAction) => {
                                    player.setNoteRange(action.payload.noteId, action.payload.range);
                                });

                            const deleteLoopNoteSubscription = actions.ofType(DELETE_LOOP_NOTE)
                                .pipe(
                                    filter((action: DeleteLoopNoteAction) => {
                                        return action.payload.loopId === loopId;
                                    })
                                )
                                .subscribe((action: DeleteLoopNoteAction) => {
                                    player.removeNote(action.payload.noteId);
                                });

                            let raf;
                            function run() {
                                raf = requestAnimationFrame(() => {
                                    const tick = timeToTick(player.currentTime, tempo);
                                    o.next(
                                        setLoopCurrentTime(loopId, tick)
                                    );

                                    run();
                                })
                            }

                            run();

                            o.next(setLoopPlayState(loopId, LoopPlayState.PLAYING));

                            return () => {
                                cancelAnimationFrame(raf);
                                player.stop(timeZero);
                                deleteLoopNoteSubscription.unsubscribe();
                                setLoopNoteRangeSubscription.unsubscribe();
                                createLoopNoteSubscription.unsubscribe();
                                setLoopRangeSubscription.unsubscribe();
                            }
                        })
                    }),
                    takeUntil(
                        actions.ofType(STOP_LOOP).pipe(
                            filter((action: StopLoopAction) => action.payload.loopId === loopId)
                        )
                    )
                )
            })
        )
}

export function startPlaybackEpic(actions) {
    return actions.ofType(START_PLAYBACK)
        .pipe(
            flatMap((action: StartPlaybackAction) => {
                return emptyObservable();
            })
        )
}
