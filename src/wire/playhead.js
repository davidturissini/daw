import { audioContext } from './audiosource';
import { register } from 'wire-service';
import { subbuffer, mix, join, silence } from './../lib/soundlab';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map, take, materialize, dematerialize } from 'rxjs/operators';
import { Record } from 'immutable';
import { Time } from './../util/time';
import { wireObservable } from './../util/wire-observable';
import { stream as audioSourceStream } from './audiosource';
import { stream as audioTrackStream } from './audiotrack';

class Playhead extends Record({
    playbackTime: null
}) {

}
const playheadSubject = new BehaviorSubject(new Playhead());

function playbackQueue(time, duration, audioTracks, audioSources) {
    const queue = [];

    return {
        next() {

        }
    }
}

class PlaybackQueue {
    queue = [];
    popResolve = null;

    constructor(time, duration, audioTracks, audioSources) {
        this.audioTracks = audioTracks;
        this.audioSources = audioSources;
        this.time = time;
        this.end = new Time(duration.milliseconds + time.milliseconds);
        this.splitDuration = Time.fromSeconds(1);
        this.finished = false;
    }

    destroyed = false;

    getBuffer(time, duration) {
        const { end, splitDuration, audioTracks, audioSources } = this;
        let audioBufferDuration = duration;
        if (duration.milliseconds + time.milliseconds > end.milliseconds) {
            audioBufferDuration = new Time(end.milliseconds - time.milliseconds);
        }
        getAudioBuffer(
            time,
            audioBufferDuration,
            audioTracks,
            audioSources
        )
        .then((buffer) => {
            if (this.destroyed === true) {
                return;
            }

            if (this.popResolve) {
                this.popResolve({
                    done: false,
                    buffer
                });
                this.popResolve = null;
            } else {
                this.queue.push(buffer);
            }

            if (time.milliseconds + splitDuration.milliseconds === end.milliseconds) {
                console.log('done queueing');
                return;
            }

            if (time.milliseconds + audioBufferDuration.milliseconds === end.milliseconds) {
                console.log('finished buffering');
                this.finished = true;
                return;
            }
            this.getBuffer(new Time(time.milliseconds + this.splitDuration.milliseconds), this.splitDuration);
        });
    }

    beginQueue() {
        this.getBuffer(this.time, this.splitDuration);
    }

    pop() {
        return new Promise((res) => {
            const next = this.queue.shift();

            // If we aren't done building the queue,
            // but we don't have anything yet,
            // Its likely that values are being asked before
            // Audio buffers have been created
            // So we need to store the resolver
            if (!this.finished && !next) {
                this.popResolve = res;
                return;
            }

            res({
                buffer: next,
                done: this.queue.length === 0,
            });
        });
    }

    stopQueue() {
        this.destroyed = true;
        this.queue = [];
    }
}

class AudioBufferPlayer {
    constructor(audioContext, queue) {
        this.queue = queue;
        this.audioContext = audioContext;
        this.timeSubject = new BehaviorSubject(new Time(0));
    }

    playBuffer(audioBuffer) {
        const { audioContext } = this;
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        this.currentSource = source;
        return new Promise((res) => {
            source.addEventListener('ended', res, { once: true });
            source.start();
        });
    }

    updateCurrentTime = (previousAudioContextSeconds) => {
        const currentTime = this.timeSubject.value;
        const currentAudioContextSeconds = this.audioContext.currentTime;
        const diffSeconds = currentAudioContextSeconds - previousAudioContextSeconds;
        const nextTime = Time.fromSeconds(currentTime.seconds + diffSeconds);
        this.timeSubject.next(nextTime);
        this.raf = requestAnimationFrame(() => {
            this.updateCurrentTime(currentAudioContextSeconds);
        });
    }

    get timeStream() {
        return this.timeSubject.asObservable();
    }

    popQueue = () => {
        this.queue.pop().then(({ buffer, done }) => {
            return this.playBuffer(buffer)
                .then(() => {
                    if (this.playing === false) {
                        return;
                    }
                    if (done === false) {
                        this.popQueue();
                    } else {
                        this.timeSubject.complete();
                    }
                });
        })

    }

    start() {
        this.updateCurrentTime(this.audioContext.currentTime);
        this.popQueue();
    }

    stop() {
        this.playing = false;
        this.timeSubject.complete();
        cancelAnimationFrame(this.raf);
        if (this.currentSource) {
            this.currentSource.stop();
        }
    }
}

class PlaybackController {
    constructor(audioContext, start) {
        this.audioContext = audioContext;
        this.currentTime = this.startTime = start;
        this.state = this.states['stop'];
    }

    states = {
        stop: {
            enter() {
                console.log('enter stop');
            },
            exit() {
                console.log('exit stop');
            }
        },
        play: {
            enter(playbackController) {
                audioTrackStream.pipe(switchMap((audioTracks) => {
                    return audioSourceStream
                        .pipe(map((audioSources) => {
                            return {
                                audioTracks,
                                audioSources
                            };
                        }))
                        .pipe(take(1));
                }))
                .pipe(switchMap(({ audioTracks, audioSources }) => {
                    const timeAnchor = playbackController.currentTime;
                    return Observable.create((o) => {
                        const queue = new PlaybackQueue(timeAnchor, new Time(10 * 60 * 1000), audioTracks, audioSources);
                        queue.beginQueue();
                        const bufferPlayer = new AudioBufferPlayer(audioContext, queue);
                        bufferPlayer.start();
                        bufferPlayer.timeStream.subscribe(o);
                        return () => {
                            queue.stopQueue();
                            bufferPlayer.stop();
                        }
                    })
                    .pipe(map((time) => {
                        return new Time(
                            timeAnchor.milliseconds + time.milliseconds
                        );
                    }))
                    .pipe(materialize());
                }))
                .pipe(dematerialize())
                .subscribe(
                    (time) => {
                        playbackController.currentTime = time;
                        playheadSubject.next(
                            playheadSubject.value.set('playbackTime', time)
                        );
                    },
                    null,
                    () => {
                        console.log('done?')
                        playheadSubject.next(
                            playheadSubject.value.set('playbackTime', null)
                        );
                    }
                );
            },
            exit() {
                console.log('exit play');
            },
        }
    }

    enter(key) {
        this.state.exit(this);
        this.state = this.states[key];
        this.state.enter(this);
    }

    play() {
        this.enter('play');
    }


}

/*
 *
 *
 * Renders audio data from an audio source to a segment
 * Property offsets underlying audio based on cursor position
 *
 */
function renderSegment(segment, audioSource, startTime /* global start */, duration /* global duration */) {
    const {
        milliseconds: cursorMilliseconds,
    } = startTime;
    const {
        sourceOffset,
        duration: segmentDuration,
        offset,
    } = segment;
    const {
        milliseconds: offsetMilliseconds,
    } = offset;

    const {
        milliseconds: segmentDurationMilliseconds,
    } = segmentDuration;

    const playbackEndMs = duration.milliseconds + startTime.milliseconds;

    const segmentEndMilliseconds = offsetMilliseconds + segmentDurationMilliseconds;

    const cursorDiff = offsetMilliseconds > cursorMilliseconds ? 0 : cursorMilliseconds - offsetMilliseconds;
    const durationDiff = segmentEndMilliseconds < playbackEndMs ? 0 : segmentEndMilliseconds - playbackEndMs;

    return {
        audio: subbuffer(
            audioSource.audio,
            sourceOffset.milliseconds + cursorDiff,
            (segmentDuration.milliseconds - durationDiff) - cursorDiff,
        ),
        offset,
        segmentDuration,
    };
}

/*
 *
 * Adds silent audio buffers between rendered segments
 *
 */
function fillRenderedSegments(renderedSegments, startTime) {
    const {
        milliseconds: cursorMilliseconds,
    } = startTime;

    return renderedSegments.reduce((seed, renderedSegment, index) => {
        const previous = seed[index - 1];
        const previousEndMs = index === 0 ? cursorMilliseconds : previous.offset.milliseconds + previous.duration.milliseconds;
        const startMs = renderedSegment.offset.milliseconds;
        const diff = startMs - previousEndMs;
        if (diff > 0) {
            seed.push(
                silence(
                    renderedSegment.audio.sampleRate,
                    renderedSegment.audio.numberOfChannels,
                    diff
                )
            );
        }

        seed.push(renderedSegment.audio);
        return seed;
    }, []);
}

function segmentInTimeRange(segment, startTime, duration) {
    const {
        milliseconds: cursorMilliseconds,
    } = startTime;

    const {
        milliseconds: playbackDurationMilliseconds,
    } = duration;

    const playbackEndMilliseconds = cursorMilliseconds + playbackDurationMilliseconds;
    const startMilliseconds = segment.offset.milliseconds;
    const endMilliseconds = startMilliseconds + segment.duration.milliseconds;
    return (
        (
            cursorMilliseconds >= startMilliseconds &&
            cursorMilliseconds < endMilliseconds
        ) ||
        (
            playbackEndMilliseconds >= startMilliseconds &&
            playbackEndMilliseconds < endMilliseconds
        )
    );
}

/*
 *
 *
 * Renders a track to a playable AudioBuffer
 *
 */
function renderTrackToAudioBuffer(audioTrack, audioSources, start, duration) {
    const filteredSegments = audioTrack.segments.toList().filter((segment) => {
        return segmentInTimeRange(
            segment,
            start,
            duration,
        );
    });

    if (filteredSegments.size === 0) {
        return null;
    }

    const renderedSegments = audioTrack.segments.toList().map((segment) => {
        const { sourceId } = segment;
        return renderSegment(
            segment,
            audioSources.get(sourceId),
            start,
            duration,
        );
    })
    .toArray();

    const filled = fillRenderedSegments(renderedSegments, start)

    return join(filled);
}

function getAudioBuffer(start, duration, audioTracks, audioSources) {
    let audioBuffers = audioTracks.map((audioTrack) => {
        return renderTrackToAudioBuffer(
            audioTrack,
            audioSources,
            start,
            duration,
        );
    })
    .filter((audioBuffer) => {
        return audioBuffer !== null;
    })
    .toList()
    .toJS();

    if (audioBuffers.length === 0) {
        audioBuffers = [
            silence(
                audioContext.sampleRate,
                2,
                duration.milliseconds,
            )
        ];
    }

    return mix(audioContext, audioBuffers);
}

export function play(start) {
    const playbackController = new PlaybackController(
        audioContext,
        start,
    );

    playbackController.play();
}

export const playheadSym = Symbol();
register(playheadSym, wireObservable(playheadSubject.asObservable()));
