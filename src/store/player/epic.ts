import {
    START_PLAYBACK,
    PLAY_TRACK_LOOP,
} from './const';
import { flatMap, repeat } from 'rxjs/operators';
import { StartPlaybackAction, PlayTrackLoopAction } from './action';
import { empty as emptyObservable, from as observableFrom, Observable, Observer } from 'rxjs';
import { appStore } from '../index';
import { AudioSegment } from 'store/audiosegment';
import { AudioTrack, Loop } from 'store/audiotrack';
import { Instrument } from 'store/instrument';
import { notes as octaves, MidiNote } from 'util/sound';
import { Time, beatToTime } from 'util/time';
import { AudioRange } from 'util/audiorange';

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

                return observableFrom(loop.notes.toList().toArray())
                    .pipe(
                        flatMap((note: MidiNote) => {
                            let instrumentStartTime: Time = audioContextStartTime.plus(note.range.start);
                            return Observable.create((o: Observer<AudioRange>) => {
                                const start = instrumentStartTime;
                                const duration = note.range.duration;
                                const timeTillNextPlay = beatToTime(loop.duration, 128);
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
                                        node.type = trackInstrument.data.type;
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
