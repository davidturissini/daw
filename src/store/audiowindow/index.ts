import { Record } from 'immutable';
import { Frame } from 'util/geometry';
import { AudioRange } from 'util/audiorange';
import { timeZero, Time } from 'util/time';

export class AudioWindow extends Record<{
    id: string;
    frame: Frame;
    visibleRange: AudioRange;
    quanitization: number;
}>({
    id: '',
    frame: {
        height: 0,
        width: 0,
    },
    visibleRange: new AudioRange(timeZero, timeZero),
    quanitization: 1 / 4,
}) {

}

export function mapBeatMarks<T>(audioWindow: AudioWindow, bpm: number, cb: (beat: number, time: Time) => T): T[] {
    return new BeatRange(bpm, audioWindow).map<T>(cb);
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
    bpm: number;
    audioWindow: AudioWindow;
    constructor(bpm: number, audioWindow: AudioWindow) {
        this.bpm = bpm;
        this.audioWindow = audioWindow;
    }

    map<T>(cb: (beat: number, time: Time) => T): T[] {
        const { audioWindow } = this;
        const { visibleRange, quanitization } = audioWindow;
        const { start, duration } = visibleRange;
        const beatsPerSecond = 128 / 60;
        const tickDistanceMs = beatsPerSecond * quanitization;
        const min = Math.ceil(start.seconds / tickDistanceMs);
        const d = Math.floor((start.seconds + duration.seconds) / tickDistanceMs);

        const ticks: T[] = [];
        for(let i = min; i <= d; i += 1) {
            const time = Time.fromSeconds(i * tickDistanceMs);
            const value: T = cb(i, time);
            ticks.push(value);
        }

        return ticks;
    }
}
