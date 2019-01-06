import { register } from 'wire-service';
import {
    BehaviorSubject,
    Observable,
    combineLatest,
    of as observableOf,
    zip as observableZip,
} from 'rxjs';
import {
    switchMap,
    concat,
    map,
    flatMap,
    filter,
    take,
    takeUntil,
    materialize,
    dematerialize,
    startWith,
    repeat,
    distinctUntilChanged,
    pairwise,
} from 'rxjs/operators';
import { Record, Map as ImmutableMap } from 'immutable';
import { Time } from './../util/time';
import { wireObservable } from './../util/wire-observable';
import {
    stream as audioSourceStream,
    audioContext as defaultAudioContext,
} from './audiosource';
import {
    stream as audioTrackStream,
    segmentInTimeRange,
} from './audiotrack';
import { connectMasterOut } from './masterout';
import { AudioRange, clamp } from '../util/audiorange';
import toWav from 'audiobuffer-to-wav';
import saveAs from 'file-saver';
import { AuroraSourceNode } from './../player/AudioDevice';
import { stream as editorStream } from './editor';

class Playhead extends Record({
    playbackRange: null,
    currentTime: null,
    auroraNodes: new ImmutableMap(),
}) {

}
const playheadSubject = new BehaviorSubject(new Playhead({
    playbackRange: new AudioRange(
        new Time(0),
        new Time(30000)
    )
}));

export const stream = playheadSubject.asObservable();

function getPlaybackData(currentTime, playbackRange, segmentRange, segmentSourceOffset) {
    let startOffset = segmentRange.start.subtract(currentTime);
    let offset = segmentSourceOffset;
    if (startOffset.milliseconds < 0) {
        offset = offset.subtract(startOffset);
        startOffset = new Time(0);
    }

    return {
        when: startOffset,
        offset: offset,
        duration: clamp(playbackRange, segmentRange).duration,
    };
}

const playbackEndedStream = stream.pipe(
    pairwise(),
    filter(([last, current]) => {
        return (
            last.currentTime !== null &&
            current.currentTime === null
        );
    })
);

const playbackRangeStartStream = editorStream.pipe(map((editor) => {
        return editor.cursor;
    }))
    .pipe(
        distinctUntilChanged(),
        takeUntil(playbackEndedStream),
        repeat(),
    );

const playbackRangeStream = audioTrackStream.pipe(
    switchMap((audioTracks) => {
        return combineLatest(
            playbackRangeStartStream,
            audioSourceStream.pipe(take(1)),
            (currentTime, audioSources) => {
                const playhead = playheadSubject.value;
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

    })
);

function makeSourceNodesStream(audioContext) {
    return playbackRangeStream.pipe(
        map(({ audioTracks, audioSources, range }) => {
            let sourceNodes = new ImmutableMap();
            audioTracks.forEach((track) => {
                track.segments
                    .filter((segment) => {
                        return segmentInTimeRange(
                            segment,
                            range.start,
                            range.duration,
                        );
                    })
                    .forEach((segment) => {
                        const audioSource = audioSources.get(segment.sourceId);
                        const asset = AV.Asset.fromBuffer(audioSource.data);
                        const playbackData = getPlaybackData(
                            range.start,
                            range,
                            segment.range,
                            segment.sourceOffset,
                        );
                        const auroraNode = new AuroraSourceNode(
                            asset,
                            audioContext,
                            audioSource.channelsCount,
                            audioSource.sampleRate,
                            audioSource.duration.seconds,
                            {
                                when: playbackData.when.seconds,
                                offset: playbackData.offset.seconds,
                                duration: playbackData.duration.seconds,
                            }
                        );

                        sourceNodes = sourceNodes.set(segment.id, auroraNode);
                    });
            });

            return { sourceNodes, range };
        })
    )
}

makeSourceNodesStream(defaultAudioContext)
    .subscribe(({ sourceNodes }) => {
        const playhead = playheadSubject.value;
        playheadSubject.next(
            playhead.set('auroraNodes', sourceNodes)
        );
    })


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

function playStream(audioContext, auroraNodes, range) {
    const timeAnchor = range.start;
    const audioContextCurrentTime = Time.fromSeconds(audioContext.currentTime);

    return Observable.create((o) => {
        //if (audioContext.state === 'suspended') {
            audioContext.resume();
        //}
        const promises = auroraNodes.map((node) => {
            node.node.connect(audioContext.destination);
            return node.start();
        })
        .toList()
        .toArray();

        o.next(Promise.all(promises));

        return () => {
            auroraNodes.forEach((node) => node.stop());
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
    const offline = new OfflineAudioContext(2, length, sampleRate)

    makeSourceNodesStream(offline)
        .pipe(switchMap(({ sourceNodes, range }) => {
            return playStream(
                offline,
                sourceNodes,
                range
            )
            .pipe(startWith(range.start))
            .pipe(materialize())
        }))
        .pipe(dematerialize())
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

    offline.startRendering().then((audioBuffer) => {
        const wav = toWav(audioBuffer);
        const blob = new Blob([wav]);
        saveAs(blob, 'output.wav');
    })
}

export function play() {
    if (playSubscription) {
        playSubscription.unsubscribe();
    }

    playSubscription = playbackRangeStream
        .pipe(switchMap(({ range }) => {
            return playStream(
                defaultAudioContext,
                playheadSubject.value.auroraNodes,
                range
            )
            .pipe(startWith(range.start))
            .pipe(materialize())
        }))
        .pipe(dematerialize())
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


export const playheadSym = Symbol();
register(playheadSym, wireObservable(stream));
