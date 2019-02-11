import {
    START_PLAYBACK,
    PLAY_TRACK_LOOP,
    PLAY_PIANO_KEY,
    STOP_PIANO_KEY,
} from './const';
import { flatMap, filter, takeUntil } from 'rxjs/operators';
import { StartPlaybackAction, PlayTrackLoopAction, PlayPianoKeyAction, StopPianoKeyAction } from './action';
import { empty as emptyObservable, empty, Observable, Subscription } from 'rxjs';
import { appStore } from '../index';
import { createInstrumentNode } from 'store/instrument';
import { MidiNote, PianoKey } from 'util/sound';
import { timeZero, beatToTime, Time } from 'util/time';
import { Loop } from 'store/loop';
import { Loop as ToneLoop, Transport } from 'tone';
import { Clock } from 'store/player/clock';
import { CREATE_INSTRUMENT, SET_INSTRUMENT_DATA } from 'store/instrument/const';
import { CreateInstrumentAction, SetInstrumentDataAction } from 'store/instrument/action';
import { InstrumentAudioNode } from 'store/instrument/types';
import { containsTime, clamp, AudioRange, contains } from 'util/audiorange';
import { Tempo } from 'store/project';

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

function clampNotes(midiNotes: MidiNote[], range: AudioRange, tempo: Tempo) {
    return midiNotes.filter((note) => {
        return contains(note.range.toAudioRange(tempo), range);
    })
    .map((midiNote: MidiNote) => {
        const noteAudioRange = midiNote.range.toAudioRange(tempo);
        const clamped = clamp(range, noteAudioRange);

        return {
            note: midiNote,
            clampOffsetRange: clamped,
        };
    })
}

export function playTrackLoopEpic(actions) {
    let clock: Clock | null = null;
    return actions.ofType(PLAY_TRACK_LOOP)
        .pipe(
            flatMap((action: PlayTrackLoopAction) => {
                const { audioContext, instrumentId, loopId, tempo } = action.payload;
                if (clock === null) {
                    clock = new Clock(Transport, tempo);
                }

                const { loop: loops } = appStore.getState();
                const loop = loops.items.get(loopId) as Loop;
                const instrumentNode = instrumentNodes[instrumentId];
                instrumentNode.connect(audioContext.destination);
                return Observable.create((o) => {
                    const isTransportStarted = Transport.state === 'started';
                    let startTime = isTransportStarted ? clock!.nextBeatTime.seconds : Transport.seconds;

                    if (isTransportStarted === false) {
                        Transport.start();
                    }

                    const toneLoop = new ToneLoop((time: number) => {
                        const { loop: loops } = appStore.getState();
                        const innerLoop = loops.items.get(loopId) as Loop;

                        const flattenedNotes = innerLoop.notes.toList().toArray().reduce((seed: MidiNote[], noteMap) => {
                            return seed.concat(noteMap.toList().toArray());
                        }, []);

                        clampNotes(flattenedNotes, { start: timeZero, duration: beatToTime(loop.duration, tempo) }, tempo).forEach(({ note, clampOffsetRange }) => {
                            instrumentNode.trigger(note.note as PianoKey, note.velocity, Time.fromSeconds(time).plus(clampOffsetRange.start), timeZero, clampOffsetRange.duration);
                        })
                    }, beatToTime(loop.duration, tempo).seconds).start(startTime);
                    return () => {
                        toneLoop.stop(0);
                    }
                });
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
