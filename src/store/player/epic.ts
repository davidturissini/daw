import {
    START_PLAYBACK,
    PLAY_TRACK_LOOP,
    PLAY_PIANO_KEY,
    STOP_PIANO_KEY,
} from './const';
import { flatMap, filter, takeUntil } from 'rxjs/operators';
import { StartPlaybackAction, PlayTrackLoopAction, PlayPianoKeyAction, StopPianoKeyAction } from './action';
import { empty as emptyObservable, empty, Observable } from 'rxjs';
import { appStore } from '../index';
import { Instrument, render as renderInstrument } from 'store/instrument';
import { MidiNote, PianoKey } from 'util/sound';
import { timeZero, beatToTime, Time } from 'util/time';
import { Loop } from 'store/loop';
import { Loop as ToneLoop, Transport } from 'tone';
import { Clock } from 'store/player/clock';

export function playPianoKeyEpic(actions) {
    return actions.ofType(PLAY_PIANO_KEY)
        .pipe(
            flatMap((action: PlayPianoKeyAction) => {
                const { audioContext, instrument, key, tempo } = action.payload;
                const instrumentNode = renderInstrument(audioContext, instrument, tempo);
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

export function playTrackLoopEpic(actions) {
    let clock: Clock | null = null;
    return actions.ofType(PLAY_TRACK_LOOP)
        .pipe(
            flatMap((action: PlayTrackLoopAction) => {
                const { audioContext, instrumentId, loopId, tempo } = action.payload;
                if (clock === null) {
                    clock = new Clock(Transport, tempo);
                }

                const { instrument, loop: loops } = appStore.getState();
                const trackInstrument = instrument.items.get(instrumentId) as Instrument<any>;
                const loop = loops.items.get(loopId) as Loop;
                const instrumentNode = renderInstrument(audioContext, trackInstrument, tempo);
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

                        innerLoop.notes.toList().toArray().reduce((seed: MidiNote[], noteMap) => {
                            return seed.concat(noteMap.toList().toArray());
                        }, [])
                        .forEach((note: MidiNote) => {
                            const timeRange = note.range.toAudioRange(tempo);
                            instrumentNode.trigger(note.note as PianoKey, note.velocity, Time.fromSeconds(time).plus(timeRange.start), timeZero, timeRange.duration);
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
