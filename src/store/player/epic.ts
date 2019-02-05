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
import { AudioSegment } from 'store/audiosegment';
import { AudioTrack } from 'store/audiotrack';
import { Instrument, render as renderInstrument } from 'store/instrument';
import { notes as octaves, MidiNote, PianoKey } from 'util/sound';
import { timeZero, beatToTime, Time, timeToBeat } from 'util/time';
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
                    const segmentInstrument = instrument.items.get(segmentTrack.instrumentId) as Instrument<any>;
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
