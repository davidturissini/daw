import {
    START_PLAYBACK,
    PLAY_TRACK_LOOP,
} from './const';
import { flatMap, repeat, filter, takeUntil, map } from 'rxjs/operators';
import { StartPlaybackAction, PlayTrackLoopAction } from './action';
import { empty as emptyObservable, from as observableFrom, Observable, Observer, empty } from 'rxjs';
import { appStore } from '../index';
import { AudioSegment } from 'store/audiosegment';
import { AudioTrack } from 'store/audiotrack';
import { Instrument, render as renderInstrument } from 'store/instrument';
import { notes as octaves, MidiNote, audioContext } from 'util/sound';
import { Time, beatToTime, Beat, timeToBeat, timeZero } from 'util/time';
import { AudioRange } from 'util/audiorange';
import { Tempo } from 'store/project';
import { Loop } from 'store/loop';
import { InstrumentRenderer } from 'store/instrument/types';
import { SET_DRUM_MACHINE_SWITCH_ON_OFF } from 'store/instrument/const';
import { SetDrumMachineSwitchOnOffAction } from 'store/instrument/action';

function loopPlaybackStream(instrument: InstrumentRenderer, loop: Loop, clock: Clock, initialStartTime: Time, initialOffsetTime: Time) {
    instrument.connect(audioContext.destination);
    return observableFrom(loop.notes.toList().toArray())
        .pipe(
            flatMap((note: MidiNote) => {
                let startTime: Time = initialStartTime;
                let offsetTime: Time = initialOffsetTime;

                return Observable.create((o: Observer<AudioRange>) => {
                    o.next(
                        new AudioRange(startTime, note.range.duration),
                    );
                    o.complete();

                    const timeTillNextPlay = beatToTime(loop.duration, clock.tempo).minus(offsetTime);
                    startTime = startTime.plus(timeTillNextPlay);
                    offsetTime = timeZero;
                })
                .pipe(
                    flatMap((range: AudioRange) => {
                        return Observable.create((o: Observer<never>) => {
                            const { frequency } = octaves[note.note];
                            instrument.trigger(frequency, range, offsetTime)
                                .then(() => {
                                    o.complete();
                                });

                            return () => {
                                instrument.kill();
                            }
                        });
                    }),
                    repeat()
                )
            })
        );
}

class Clock {
    audioContext: AudioContext;
    audioContextStartTime: Time;
    tempo: Tempo;
    constructor(audioContext: AudioContext, tempo: Tempo) {
        this.tempo = tempo;
        this.audioContext = audioContext;
        this.audioContextStartTime = Time.fromSeconds(this.audioContext.currentTime);
    }

    get currentTime(): Time {
        const audioContextTime = Time.fromSeconds(this.audioContext.currentTime);
        return audioContextTime.minus(this.audioContextStartTime);
    }

    get currentBeat(): Beat {
        return timeToBeat(this.currentTime, this.tempo);
    }

    get nextBeat(): Beat {
        const { currentBeat } = this;
        const roundedBeatIndex = Math.floor(currentBeat.index / 4);
        return new Beat((roundedBeatIndex + 1) * 4);
    }

    get nextBeatTime(): Time {
        return beatToTime(this.nextBeat, this.tempo);
    }

    timeSincePreviousBar(): Time {
        const { currentBeat, tempo } = this;
        const mod = currentBeat.index % 4;
        const barStart = new Beat(currentBeat.index - mod);
        return this.currentTime.minus(beatToTime(barStart, tempo));
    }

    timeUntilNextBar(): Time {
        const { currentBeat, tempo } = this;
        if (currentBeat.index % 4 === 0) {
            return beatToTime(currentBeat, tempo)
        }
        return beatToTime(this.nextBeat, tempo).minus(this.currentTime);
    }
}

function createLoopStream(clock: Clock, loop: Loop, instrument: InstrumentRenderer, startTime: Time, offsetTime: Time) {
    return loopPlaybackStream(instrument, loop, clock, startTime, offsetTime);
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

                let startTime: Time | null = null;
                let offsetTime: Time = timeZero;
                Observable.create((o) => {
                    const { instrument, loop: loops } = appStore.getState();
                    const trackInstrument = instrument.items.get(instrumentId) as Instrument<any>;
                    const loop = loops.items.get(loopId) as Loop;
                    const renderedInstrument = renderInstrument(audioContext, trackInstrument, tempo);
                    if (startTime === null) {
                        startTime = clock!.timeUntilNextBar();
                    } else {
                        startTime = clock!.currentTime;
                        offsetTime = clock!.timeSincePreviousBar();
                    }
                    o.next({ loop, renderedInstrument, startTime, offsetTime });
                    o.complete();
                })
                .pipe(
                    map(({ loop, renderedInstrument, startTime, offsetTime }) => {
                        return createLoopStream(clock as Clock, loop, renderedInstrument, startTime, offsetTime)
                    }),
                    flatMap((stream: Observable<any>) =>{
                        return stream.pipe(
                            takeUntil(
                                actions.ofType(SET_DRUM_MACHINE_SWITCH_ON_OFF)
                                    .pipe(
                                        filter((action: SetDrumMachineSwitchOnOffAction) => action.payload.instrumentId === instrumentId)
                                    )
                            ),
                        )
                    }),
                    repeat()
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
