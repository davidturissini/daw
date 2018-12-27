import { audioContext } from './audiosource';
import { register } from 'wire-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map, take, materialize, dematerialize } from 'rxjs/operators';
import { Record } from 'immutable';
import { Time } from './../util/time';
import { wireObservable } from './../util/wire-observable';
import { stream as audioSourceStream } from './audiosource';
import { stream as audioTrackStream } from './audiotrack';
import { incrementVisibleRangeStart } from './editor';
import { renderAudioBuffer } from './audiorender';
import { connectMasterOut } from './masterout';

class Playhead extends Record({
    playbackTime: null
}) {

}
const playheadSubject = new BehaviorSubject(new Playhead());

class PlaybackQueue {
    queue = [];
    popResolve = null;

    constructor(time, duration, audioTracks, audioSources) {
        this.audioTracks = audioTracks;
        this.audioSources = audioSources;
        this.time = time;
        this.end = new Time(duration.milliseconds + time.milliseconds);
        this.splitDuration = Time.fromSeconds(5);
        this.finished = false;
    }

    destroyed = false;

    getBuffer(time, duration) {
        const { end, splitDuration, audioTracks, audioSources } = this;
        let audioBufferDuration = duration;
        if (duration.milliseconds + time.milliseconds > end.milliseconds) {
            audioBufferDuration = new Time(end.milliseconds - time.milliseconds);
        }
        renderAudioBuffer(
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
                return;
            }

            if (time.milliseconds + audioBufferDuration.milliseconds === end.milliseconds) {
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
        connectMasterOut(source);
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
        this.currentTime = start;
        this.state = this.states['stop'];
    }

    states = {
        stop: {
            enter() {
                playheadSubject.next(
                    playheadSubject.value.set('playbackTime', null)
                );
            },
            exit() {}
        },
        play: {
            enter(playbackController) {
                this.subscription = audioTrackStream.pipe(switchMap((audioTracks) => {
                    return audioSourceStream
                        .pipe(map((audioSources) => {
                            return {
                                audioTracks,
                                audioSources,
                            };
                        }))
                        .pipe(take(1));
                }))
                .pipe(switchMap(({ audioTracks, audioSources }) => {
                    const timeAnchor = playbackController.currentTime;
                    return Observable.create((o) => {
                        const queue = new PlaybackQueue(
                            timeAnchor,
                            new Time(10 * 60 * 1000),
                            audioTracks,
                            audioSources
                        );
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
                        const millisecondsDiff = time.milliseconds - playbackController.currentTime.milliseconds;
                        incrementVisibleRangeStart(new Time(millisecondsDiff))
                        playbackController.currentTime = time;
                        playheadSubject.next(
                            playheadSubject.value.set('playbackTime', time)
                        );

                    },
                    null,
                    () => {
                        playheadSubject.next(
                            playheadSubject.value.set('playbackTime', null)
                        );
                    }
                );
            },
            exit() {
                this.subscription.unsubscribe();
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

    stop() {
        this.enter('stop');
    }


}

let playbackController = null;

export function isPlaying() {
    return playheadSubject.value.playbackTime !== null;
}

export function stop() {
    if (playbackController) {
        playbackController.stop();
    }
}

export function play(start) {
    if (playbackController) {
        stop();
    }
    playbackController = new PlaybackController(
        audioContext,
        start,
    );

    playbackController.play();
}

export const playheadSym = Symbol();
register(playheadSym, wireObservable(playheadSubject.asObservable()));
