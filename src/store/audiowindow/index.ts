import { Record } from 'immutable';
import { Rect, Frame } from 'util/geometry';
import { AudioRange } from 'util/audiorange';
import { timeZero, Time, Beat, beatToTime } from 'util/time';
import { Tempo } from 'store/project';

export class AudioWindow extends Record<{
    id: string;
    rect: Rect;
    visibleRange: AudioRange;
    quanitization: Beat;
    virtualCursor: Time | null;
}>({
    id: '',
    rect: {
        x: 0,
        y: 0,
        height: 0,
        width: 0,
    },
    visibleRange: new AudioRange(timeZero, timeZero),
    quanitization: new Beat(1),
    virtualCursor: null,
}) {
    get frame(): Frame {
        return {
            height: this.rect.height,
            width: this.rect.width,
        };
    }
}

export function mapBeatMarks<T>(audioWindow: AudioWindow, tempo: Tempo, cb: (beat: number, time: Time) => T): T[] {
    return new BeatRange(tempo, audioWindow).map<T>(cb);
}

export function mapTimeMarks<T>(audioWindow: AudioWindow, resolution: Time, fn: (time: Time) => T): T[] {
    const { visibleRange } = audioWindow;
    const tickValues = getTickValues(visibleRange, resolution.milliseconds);
    const values: T[] = [];
    for(let i = 0; i < tickValues.length; i += 1) {
        const time = new Time(tickValues[i]);
        const value = fn(time);
        values.push(value);
    }
    return values;
}

function getTickValues(range: AudioRange, tickDistanceMs: number) {
    const remainder = (range.start.milliseconds % tickDistanceMs);
    const lower = remainder === 0 ? range.start.milliseconds : range.start.milliseconds + (tickDistanceMs - (range.start.milliseconds % tickDistanceMs));
    const upper = Math.floor(range.start.milliseconds + range.duration.milliseconds);
    const numberOfTicks = (upper - lower) / tickDistanceMs;
    const values: number[] = [];
    for(let i = 0; i < numberOfTicks; i += 1) {
        values.push(lower + (i * tickDistanceMs));
    }
    return values;
}

class BeatRange {
    tempo: Tempo;
    audioWindow: AudioWindow;
    constructor(tempo: Tempo, audioWindow: AudioWindow) {
        this.tempo = tempo;
        this.audioWindow = audioWindow;
    }

    map<T>(cb: (beat: number, time: Time) => T): T[] {
        const { audioWindow, tempo } = this;
        const { visibleRange, quanitization } = audioWindow;
        const { start, duration } = visibleRange;
        const tickDistanceSeconds = beatToTime(quanitization, tempo).seconds;
        const min = Math.ceil(start.seconds / tickDistanceSeconds);
        const d = Math.floor((start.seconds + duration.seconds) / tickDistanceSeconds);
        const ticks: T[] = [];
        for(let i = min; i <= d; i += 1) {
            if (i !== 0) {
                const time = Time.fromSeconds(i * tickDistanceSeconds);
                const value: T = cb(i, time);
                ticks.push(value);
            }
        }

        return ticks;
    }
}

export function quanitizeTime(audioWindow: AudioWindow, time: Time, tempo: Tempo): Time {
    const quantizeInterval = audioWindow.quanitization;
    const quanitizeTime = beatToTime(quantizeInterval, tempo);
    const max = time.milliseconds + quanitizeTime.milliseconds;
    const mod = max % quanitizeTime.milliseconds;
    const nearestMax = new Time(max - mod);
    const nearestMin = nearestMax.minus(quanitizeTime);

    const minDiff = time.milliseconds - nearestMin.milliseconds;
    const maxDiff = nearestMax.milliseconds - time.milliseconds;
    if (minDiff < maxDiff) {
        return nearestMin;
    }
    return nearestMax;
}
