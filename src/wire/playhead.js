import { register } from 'wire-service';
import { BehaviorSubject, Observable, combineLatest, of as observableOf, zip as observableZip } from 'rxjs';
import { switchMap, concat, flatMap, filter, take, takeUntil, materialize, dematerialize, startWith } from 'rxjs/operators';
import { Record } from 'immutable';
import { Time } from './../util/time';
import { wireObservable } from './../util/wire-observable';
import { stream as audioSourceStream, audioContext as defaultAudioContext } from './audiosource';
import { stream as audioTrackStream } from './audiotrack';
import { renderAudioBuffer, createSilentRenderedAudioSegment } from './audiorender';
import { connectMasterOut } from './masterout';
import { AudioRange } from '../util/audiorange';
import toWav from 'audiobuffer-to-wav';
import saveAs from 'file-saver';

class Playhead extends Record({
    playbackRange: null,
    currentTime: null,
}) {

}
const playheadSubject = new BehaviorSubject(new Playhead({
    playbackRange: new AudioRange(
        new Time(0),
        new Time(30000)
    )
}));

function createCurrentTimeStream(audioContext, startAudioContextSeconds, initialTime) {
    return Observable.create((o) => {
        let raf;
        function rafCallback() {
            const currentAudioContextTime = Time.fromSeconds(audioContext.currentTime);
            const diff = currentAudioContextTime.subtract(startAudioContextSeconds);
            const currentTime = initialTime.add(diff);
            o.next(currentTime);
            raf = requestAnimationFrame(rafCallback);
        }
        rafCallback();

        return () => cancelAnimationFrame(raf);
    })
}

function playStream(audioContext, audioTracks, audioSources, currentTime, range) {
    const timeAnchor = range.start;
    const rangeDuration = range.duration;
    const audioContextCurrentTime = Time.fromSeconds(audioContext.currentTime);

    return Observable.create((o) => {
        const rendered = renderAudioBuffer(
            audioContext,
            range,
            audioTracks,
            audioSources
        );
        let maxDuration = new Time(0);
        const allRenderedAudioSegments = rendered.reduce((seed, renderedAudioSegments) => {
            return seed.concat(renderedAudioSegments);
        }, []);

        // Handle if the playback duration is
        // greater than track durations
        if (rangeDuration.greaterThan(maxDuration)) {
            const silence = createSilentRenderedAudioSegment(
                audioContext,
                range,
                rangeDuration.subtract(maxDuration),
            );

            allRenderedAudioSegments.push(silence);
        }

        connectMasterOut(audioContext, allRenderedAudioSegments);

        const promises = allRenderedAudioSegments.map((renderedAudioSegment) => {
            return renderedAudioSegment.start(
                audioContextCurrentTime,
                timeAnchor
            );
        });

        o.next(Promise.all(promises));

        return function() {
            allRenderedAudioSegments.forEach((renderedAudioSegment) => {
                renderedAudioSegment.stop();
            });
        }
    })
    .pipe(
        flatMap((completedPromise) => {
            const shared = createCurrentTimeStream(
                audioContext,
                audioContextCurrentTime,
                timeAnchor
            );
            return shared.pipe(takeUntil(completedPromise))
                .pipe(
                    concat(
                        observableOf(range.start.plus(range.duration))
                    )
                )
                .pipe(materialize());
        })
    )
    .pipe(dematerialize());
}

export function isPlaying() {
    return playheadSubject.value.currentTime !== null;
}

let playSubscription = null;

export function setPlaybackDuration(duration) {
    const current = playheadSubject.value;
    const nextRange = new AudioRange(
        current.playbackRange.start,
        duration,
    );
    playheadSubject.next(
        playheadSubject.value.set('playbackRange', nextRange)
    );
}

export function incrementPlaybackDuration(time) {
    const current = playheadSubject.value;
    setPlaybackDuration(current.playbackRange.duration.plus(time))
}

export function stop() {
    if (playSubscription) {
        playSubscription.unsubscribe();
        playSubscription = null;
        playheadSubject.next(
            playheadSubject.value.set('currentTime', null)
        );
    }
}

export function rasterize(startTime) {
    const { sampleRate } = defaultAudioContext;
    const duration = playheadSubject.value.playbackRange.duration.minus(startTime);
    const length = sampleRate * duration.seconds;
    console.log(duration)
    const offline = new OfflineAudioContext(2, length, sampleRate)

    observableZip(
        audioTrackStream,
        audioSourceStream
    ).pipe(
        flatMap(([audioTracks, audioSources]) => {
            return playStream(
                offline,
                audioTracks,
                audioSources,
                startTime,
                new AudioRange(
                    startTime,
                    duration
                )
            )
        })
    )
    .subscribe(
        (time) => {
            console.log('ok')
        },
        null,
        () => {
            console.log('done')
        }
    );

    offline.startRendering().then((audioBuffer) => {
        const wav = toWav(audioBuffer);
        const blob = new Blob([wav]);
        saveAs(blob, 'output.wav');
    })
}

export function play(startTime) {
    if (playSubscription) {
        playSubscription.unsubscribe();
    }

    playSubscription = audioTrackStream.pipe(switchMap((audioTracks) => {
        return combineLatest(
            stream.pipe(filter((playhead) => playhead.currentTime !== null)).pipe(take(1)),
            audioSourceStream,
            (playhead, audioSources) => {
                const { currentTime } = playhead;
                const diff = currentTime.subtract(playhead.playbackRange.start);
                const currentTimeRange = new AudioRange(
                    currentTime,
                    playhead.playbackRange.duration.subtract(diff)
                );
                return {
                    audioTracks,
                    audioSources,
                    range: currentTimeRange,
                };
            })
            .pipe(take(1));
    }))
    .pipe(switchMap(({ audioTracks, audioSources, range }) => {
        return playStream(
            defaultAudioContext,
            audioTracks,
            audioSources,
            range.start,
            range
        )
    }))
    .pipe(startWith(startTime))
    .subscribe(
        (time) => {
            playheadSubject.next(
                playheadSubject.value.set('currentTime', time)
            );
        },
        null,
        () => {
            console.log('done')
            playheadSubject.next(
                playheadSubject.value.set('currentTime', null)
            );
        }
    );
}

export const stream = playheadSubject.asObservable();
export const playheadSym = Symbol();
register(playheadSym, wireObservable(stream));
