import { AudioRange } from 'util/audiorange';
import { Time, beatToTime, timeToBeat, Beat } from 'util/time';
import { Tempo } from 'store/project';
import { Time as ToneTime } from 'tone';

export function mapBeatMarks<T>(range: AudioRange, quanitization: Beat, tempo: Tempo, cb: (beat: Beat, time: Time) => T): T[] {
    return new BeatRange(tempo, range, quanitization).map<T>(cb);
}

export function mapTimeMarks<A>(range: AudioRange, resolution: Time, fn: (time: Time) => A): A[] {
    const tickValues = getTickValues(range, resolution.milliseconds);
    const values: A[] = [];
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
    range: AudioRange;
    quanitization: Beat;
    constructor(tempo: Tempo, range: AudioRange, quanitization: Beat) {
        this.tempo = tempo;
        this.range = range;
        this.quanitization = quanitization;
    }

    map<T>(cb: (beat: Beat, time: Time) => T): T[] {
        const { range, quanitization, tempo } = this;
        const { start, duration } = range;
        const tickDistanceSeconds = beatToTime(quanitization, tempo).seconds;
        const min = Math.ceil(start.seconds / tickDistanceSeconds);
        const d = Math.floor((start.seconds + duration.seconds) / tickDistanceSeconds);
        const ticks: T[] = [];
        for(let i = min; i <= d; i += 1) {
            if (i !== 0) {
                const time = Time.fromSeconds(i * tickDistanceSeconds);
                const value: T = cb(timeToBeat(time, tempo), time);
                ticks.push(value);
            }
        }

        return ticks;
    }
}

export function quanitizeTime(quantizeInterval: Beat, time: Time, tempo: Tempo): Time {
    const toneTime = new ToneTime(time.seconds);
    const quanitizeTime = beatToTime(quantizeInterval, tempo);
    const quantizedSeconds = toneTime.quantize(quanitizeTime.seconds);
    return Time.fromSeconds(quantizedSeconds);
}
