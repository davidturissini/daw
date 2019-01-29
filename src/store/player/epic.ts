import {
    START_PLAYBACK,
    PLAY_TRACK_LOOP,
} from './const';
import { flatMap, repeat } from 'rxjs/operators';
import { StartPlaybackAction, PlayTrackLoopAction } from './action';
import { empty as emptyObservable, from as observableFrom, Observable, Observer, empty } from 'rxjs';
import { appStore } from '../index';
import { AudioSegment } from 'store/audiosegment';
import { AudioTrack, Loop } from 'store/audiotrack';
import { Instrument } from 'store/instrument';
import { notes as octaves, MidiNote, audioContext } from 'util/sound';
import { Time, beatToTime, Beat, timeToBeat, timeZero } from 'util/time';
import { AudioRange } from 'util/audiorange';
import { Tempo } from 'store/project';

function loopPlaybackStream(loop: Loop, audioContextStartTime: Time, tempo: Tempo, delay: Time) {
    return observableFrom(loop.notes.toList().toArray())
        .pipe(
            flatMap((note: MidiNote) => {
                let instrumentStartTime: Time = audioContextStartTime.plus(note.range.start).plus(delay);
                return Observable.create((o: Observer<AudioRange>) => {
                    const start = instrumentStartTime;
                    const duration = note.range.duration;
                    const timeTillNextPlay = beatToTime(loop.duration, tempo);
                    instrumentStartTime = start.plus(timeTillNextPlay);

                    o.next(
                        new AudioRange(start, duration),
                    );
                    o.complete();
                })
                .pipe(
                    flatMap((range: AudioRange) => {
                        return Observable.create((o: Observer<never>) => {
                            const { frequency } = octaves[note.note];
                            const node = audioContext.createOscillator();
                            node.frequency.setValueAtTime(frequency, 0);
                            node.start(
                                range.start.seconds
                            );
                            node.stop(
                                range.start.plus(range.duration).seconds
                            );
                            node.connect(audioContext.destination);
                            node.onended = () => {
                                o.complete();
                            };
                        });
                    }),
                    repeat()
                )
            })
        );
}

class LoopPlayer {
    audioContext: AudioContext;
    tempo: Tempo;
    loops: Loop[] = [];
    audioContextStartTime: Time | null = null;

    constructor(audioContext: AudioContext, tempo: Tempo) {
        this.tempo = tempo;
        this.audioContext = audioContext;
    }

    addLoop(loop: Loop) {
        this.loops.push(loop);
        const audioContextTime = Time.fromSeconds(this.audioContext.currentTime);
        let delay = timeZero;
        if (this.audioContextStartTime) {
            const currentTime = audioContextTime.minus(this.audioContextStartTime);
            const currentBeat = timeToBeat(currentTime, this.tempo);
            const roundedBeatIndex = Math.floor(currentBeat.index / 4);
            const nextBeat = new Beat((roundedBeatIndex + 1) * 4);
            const beatDelay = new Beat(nextBeat.index - currentBeat.index);
            delay = beatToTime(beatDelay, this.tempo);
        }

        if (this.loops.length === 1) {
            this.play();
        }
        loopPlaybackStream(loop, Time.fromSeconds(this.audioContext.currentTime), this.tempo, delay)
            .subscribe(() => {

            })
    }

    play() {
        this.audioContextStartTime = Time.fromSeconds(this.audioContext.currentTime);
    }
}

const player = new LoopPlayer(audioContext, new Tempo(128));

export function playTrackLoopEpic(actions) {
    return actions.ofType(PLAY_TRACK_LOOP)
        .pipe(
            flatMap((action: PlayTrackLoopAction) => {
                const { audioContext, trackId, instrumentId, loopId } = action.payload;
                const { audiotrack, instrument } = appStore.getState();
                const track = audiotrack.items.get(trackId) as AudioTrack;
                const trackInstrument = instrument.items.get(instrumentId) as Instrument;
                const loop = track.loops.get(loopId) as Loop;
                const audioContextStartTime = Time.fromSeconds(audioContext.currentTime);


                player.addLoop(loop);

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
