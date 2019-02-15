import {
    START_PLAYBACK,
    PLAY_TRACK_LOOP,
    PLAY_PIANO_KEY,
    STOP_PIANO_KEY,
} from './const';
import { flatMap, filter, takeUntil, switchMap } from 'rxjs/operators';
import { StartPlaybackAction, PlayTrackLoopAction, PlayPianoKeyAction, StopPianoKeyAction } from './action';
import { empty as emptyObservable, empty, Observable, Subscription } from 'rxjs';
import { appStore } from '../index';
import { createInstrumentNode } from 'store/instrument';
import { MidiNote, PianoKey } from 'util/sound';
import { timeZero, Time } from 'util/time';
import { Loop } from 'store/loop';
import { Transport, Part as TonePart } from 'tone';;
import { CREATE_INSTRUMENT, SET_INSTRUMENT_DATA } from 'store/instrument/const';
import { CreateInstrumentAction, SetInstrumentDataAction } from 'store/instrument/action';
import { InstrumentAudioNode } from 'store/instrument/types';
import { Tempo } from 'store/project';
import { tickTime, TickRange, tickRangeContains, clampTickRange, timeToTick } from 'store/tick';
import { setLoopCurrentTime, SetLoopRangeAction, CreateLoopNoteAction, DeleteLoopNoteAction, SetLoopNoteRangeAction } from 'store/loop/action';
import { SET_LOOP_RANGE, CREATE_LOOP_NOTE, DELETE_LOOP_NOTE, SET_LOOP_NOTE_RANGE } from 'store/loop/const';

const instrumentNodes: { [key: string]: InstrumentAudioNode<any> } = {};

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
                const { audioContext, instrument, key } = action.payload;
                const instrumentNode = instrumentNodes[instrument.id];
                instrumentNode.connect(audioContext.destination);
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
                                    return action.payload.instrument === instrument && action.payload.key === key;
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

interface TonePartObject {
    time: Time;
    data: [
        PianoKey,
        number,
        Time
    ]
}

class LoopPlayer {
    notes: { [key: string]: MidiNote } = {};
    instrumentNode: InstrumentAudioNode<any>;
    tempo: Tempo;
    loopRange: TickRange;
    schedule: {[key: string]: TonePartObject } = {};
    part?: TonePart;
    onTimeUpdate?: (time: number) => void;
    constructor(instrumentNode: InstrumentAudioNode<any>, loopRange: TickRange, tempo: Tempo) {
        this.instrumentNode = instrumentNode;
        this.tempo = tempo;
        this.loopRange = loopRange;
    }

    start() {
        const { loopRange, tempo } = this;
        const loopStartTime = tickTime(loopRange.start, tempo);
        const loopDurationTime = tickTime(loopRange.duration, tempo);
        Transport.start();

        const { instrumentNode, notes } = this;
        const schedule = this.schedule = {};

        const values = Object.values(notes);
        const partObjectsArray: any[] = [];
        for(let i = 0; i < values.length; i += 1) {
            const note = values[i];
            const partObject = this.noteToPartObject(note, note.range);
            schedule[note.id] = partObject;
            partObjectsArray.push([
                partObject.time.seconds,
                partObject.data
            ])
        }
        const part = this.part = new TonePart((time: number, [note, velocity, duration]: any) => {
            instrumentNode.trigger(
                note,
                velocity,
                Time.fromSeconds(time),
                timeZero,
                duration,
            );
        }, partObjectsArray as any);
        part.loop = true;
        part.loopStart = loopStartTime.seconds;
        part.loopEnd = loopDurationTime.seconds;
        part.start(0)
    }

    setLoopRange(loopRange: TickRange) {
        const { part, tempo } = this;
        if (part) {
            part.loopEnd = tickTime(loopRange.duration, tempo).seconds;
            part.loopStart = tickTime(loopRange.start, tempo).seconds;
        }
    }

    noteToPartObject(note: MidiNote, range: TickRange): TonePartObject {
        const { tempo } = this;
        const timeDuration = tickTime(range.duration, tempo);
        const startTime = tickTime(range.start, tempo);
        return {
            time: startTime,
            data: [
                note.note as PianoKey,
                note.velocity,
                timeDuration,
            ]
        }
    }

    get currentTime(): number {
        const { part } = this;
        if (part) {
            const { loopStart, progress, loopEnd } = part;
            return (loopStart as number) + (progress * ((loopEnd as number) - (loopStart as number)));
        }
        return 0;
    }

    addNotes(notes: MidiNote[]) {
        const { part, schedule } = this;
        notes.reduce((seed, note: MidiNote) => {
            seed[note.id] = note;

            if (part) {
                const partObject = this.noteToPartObject(note, note.range);
                schedule[note.id] = partObject;
                (part as any).add(partObject.time.seconds, partObject.data);
            }

            return seed;
        }, this.notes);
    }

    setNoteRange(noteId: string, range: TickRange) {
        const note = this.notes[noteId];
        this.removeNote(noteId);
        note.range = range;
        this.addNotes([note]);
    }

    removeNote(noteId: string) {
        const { schedule, part } = this;
        if (schedule[noteId] && part) {
            (part as any).remove(schedule[noteId].time.seconds, schedule[noteId].data);
        }
        delete this.notes[noteId];
    }
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
                    const player = new LoopPlayer(instrumentNode, loop.range, tempo);
                    const { loop: loops } = appStore.getState();
                    const innerLoop = loops.items.get(loopId) as Loop;

                    const flattenedNotes = innerLoop.notes.toList().toArray().reduce((seed: MidiNote[], noteMap) => {
                        return seed.concat(noteMap.toList().toArray());
                    }, []);

                    player.addNotes(flattenedNotes);
                    o.next({ player, loopId, tempo });
                });
            }),
            switchMap(({ player, loopId, tempo }: { player: LoopPlayer, loopId: string, tempo: Tempo }) => {
                return Observable.create((o) => {
                    player.start();

                    actions.ofType(SET_LOOP_RANGE)
                        .pipe(
                            filter((action: SetLoopRangeAction) => {
                                return action.payload.loopId === loopId;
                            })
                        )
                        .subscribe((action: SetLoopRangeAction) => {
                            player.setLoopRange(action.payload.range);
                        });

                    actions.ofType(CREATE_LOOP_NOTE)
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

                    actions.ofType(SET_LOOP_NOTE_RANGE)
                        .pipe(
                            filter((action: SetLoopNoteRangeAction) => {
                                return action.payload.loopId === loopId;
                            })
                        )
                        .subscribe((action: SetLoopNoteRangeAction) => {
                            player.setNoteRange(action.payload.noteId, action.payload.range);
                        });

                    actions.ofType(DELETE_LOOP_NOTE)
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
                            const playerTime = player.currentTime;
                            const tick = timeToTick(Time.fromSeconds(playerTime), tempo);
                            o.next(
                                setLoopCurrentTime(loopId, tick)
                            );

                            run();
                        })
                    }

                    run();
                })
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
