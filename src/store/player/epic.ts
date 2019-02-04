import {
    START_PLAYBACK,
    PLAY_TRACK_LOOP,
    PLAY_PIANO_KEY,
    STOP_PIANO_KEY,
} from './const';
import { flatMap, filter, startWith, switchMap, merge, takeUntil } from 'rxjs/operators';
import { StartPlaybackAction, PlayTrackLoopAction, PlayPianoKeyAction, StopPianoKeyAction } from './action';
import { empty as emptyObservable, Observable, empty } from 'rxjs';
import { appStore } from '../index';
import { AudioSegment } from 'store/audiosegment';
import { AudioTrack } from 'store/audiotrack';
import { Instrument, render as renderInstrument } from 'store/instrument';
import { notes as octaves, MidiNote } from 'util/sound';
import { Time, beatToTime, timeZero } from 'util/time';
import { AudioRange } from 'util/audiorange';
import { Loop } from 'store/loop';
import { CREATE_LOOP_NOTE, DELETE_LOOP_NOTE } from 'store/loop/const';
import { CreateLoopNoteAction, DeleteLoopNoteAction } from 'store/loop/action';
import { Clock } from './Clock';
import { LoopPlayerDelegate, LoopClock } from './LoopClock';

export function playPianoKeyEpic(actions) {
    return actions.ofType(PLAY_PIANO_KEY)
        .pipe(
            flatMap((action: PlayPianoKeyAction) => {
                const { audioContext, instrument, key, tempo } = action.payload;
                const instrumentNode = renderInstrument(audioContext, instrument, tempo);
                instrumentNode.connect(audioContext.destination);
                instrumentNode.trigger(key, timeZero, null, null)
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

export function playTrackLoopEpic(actions) {
    let clock: Clock | null = null;
    return actions.ofType(PLAY_TRACK_LOOP)
        .pipe(
            flatMap((action: PlayTrackLoopAction) => {
                const { audioContext, instrumentId, loopId, tempo } = action.payload;
                if (clock === null) {
                    clock = new Clock(audioContext, tempo);
                }

                const reloadPlayerSignal = actions.ofType(CREATE_LOOP_NOTE)
                    .pipe(
                        merge(actions.ofType(DELETE_LOOP_NOTE)),
                        filter((action: CreateLoopNoteAction | DeleteLoopNoteAction) => action.payload.loopId === loopId)
                    );

                reloadPlayerSignal.pipe(
                    flatMap(() => {
                        return Observable.create((o) => {
                            const when = timeZero;
                            const offset = clock!.timeSincePreviousBar();
                            o.next({ when, offset });
                            o.complete();
                        })
                    }),
                    startWith({
                        when: clock!.timeUntilNextBar(),
                        offset: timeZero,
                    }),
                    switchMap(({ when, offset }: { when: Time, offset: Time }) => {
                        return Observable.create((o) => {
                            const { instrument, loop: loops } = appStore.getState();
                            const trackInstrument = instrument.items.get(instrumentId) as Instrument<any>;
                            const loop = loops.items.get(loopId) as Loop;
                            const renderedInstrument = renderInstrument(audioContext, trackInstrument, tempo);
                            renderedInstrument.connect(audioContext.destination);

                            const delegate: LoopPlayerDelegate = {
                                on(note, when, offset, duration, cb) {
                                    const subscription = renderedInstrument.trigger(note, when, offset, duration).subscribe(
                                        undefined,
                                        undefined,
                                        cb,
                                    );

                                    return function () {
                                        subscription.unsubscribe();
                                    }
                                }
                            }

                            const player = new LoopClock(
                                clock as Clock,
                                new AudioRange(timeZero, beatToTime(loop.duration, tempo)),
                                loop.notes.toList().toArray().reduce((seed: MidiNote[], noteMap) => {
                                    return seed.concat(noteMap.toList().toArray());
                                }, []),
                                delegate,
                            );
                            player.loop = true;
                            player.start(when, offset);

                            return () => {
                                player.stop();
                            }
                        })
                    })
                )
                .subscribe(() => {
                    console.log('mmk?')
                });

                return empty();
            })
        )
}

export function startPlaybackEpic(actions) {
    return actions.ofType(START_PLAYBACK)
        .pipe(
            flatMap((action: StartPlaybackAction) => {
                const { audioContext } = action.payload;
                const { audiotrack, audiosegment, instrument } = appStore.getState();
                const segments = audiotrack.items.toList().reduce((seed: AudioSegment[], audiotrack: AudioTrack) => {
                    const trackSegments: AudioSegment[] = audiotrack.segments.toList().map((segmentId: string) => {
                        return audiosegment.items.get(segmentId) as AudioSegment;
                    }).toArray();
                    return seed.concat(trackSegments);
                }, []);

                segments.forEach((segment) => {
                    const segmentTrack = audiotrack.items.get(segment.trackId) as AudioTrack;
                    const segmentInstrument = instrument.items.get(segmentTrack.instrumentId) as Instrument;
                    segment.notes.forEach((notes) => {
                        notes.forEach((note) => {
                            const { frequency } = octaves[note.note];
                            const node = audioContext.createOscillator();
                            node.frequency.setValueAtTime(frequency, 0);
                            node.type = segmentInstrument.data.type;
                            node.start(note.range.start.seconds);
                            node.stop(audioContext.currentTime + note.range.start.plus(note.range.duration).seconds);
                            node.connect(audioContext.destination);
                        });
                    });
                });

                return emptyObservable();
            })
        )
}
