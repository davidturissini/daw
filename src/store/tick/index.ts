import { Tempo } from "store/project";
import { Time } from "util/time";
import { Time as ToneTime } from 'tone';
import { Frame } from "util/geometry";

const TICKS_PER_QUARTER_BEAT = 960;

export interface Tick {
    index: number;
}

export interface TickRange {
    start: Tick;
    duration: Tick;
}

export function tick(index: number): Tick {
    return { index };
}

export function beatCountToTick(count: number): Tick {
    const tickIndex = count * TICKS_PER_QUARTER_BEAT;
    return tick(tickIndex);
}

export function tickRange(start: Tick, duration: Tick): TickRange {
    return { start, duration };
}

export const tickZero = tick(0);
export const ZERO_BEAT = tickZero
export const SIXTEENTH_BEAT = tick(TICKS_PER_QUARTER_BEAT / 4);
export const EIGHTH_BEAT = tick(TICKS_PER_QUARTER_BEAT / 2);
export const QUARTER_BEAT = tick(TICKS_PER_QUARTER_BEAT);
export const HALF_BEAT = tick(TICKS_PER_QUARTER_BEAT * 2);
export const ONE_BEAT = tick(TICKS_PER_QUARTER_BEAT * 4);
export const FOUR_BEAT = tick(TICKS_PER_QUARTER_BEAT * 16);

export function divideTickRange(range: TickRange, resolution: Tick): TickRange[] {
    const { duration, start } = range;
    const ticks: TickRange[] = [];
    for(let i = 0; i < duration.index; i += resolution.index) {
        ticks.push({
            start: tick(i + start.index),
            duration: resolution,
        });
    }
    return ticks;
}

export function tickTime(tick: Tick, tempo: Tempo): Time {
    const quarterBeatsCount = tick.index / TICKS_PER_QUARTER_BEAT;
    const seconds = tempo.secondsPerBeat * (quarterBeatsCount / 4);
    return Time.fromSeconds(seconds);
}

export function timeToTick(time: Time, tempo: Tempo): Tick {
    const { seconds } = time;
    const numberOfQuarterBeats = seconds * tempo.beatsPerSecond * 4;
    const tickIndex = numberOfQuarterBeats * TICKS_PER_QUARTER_BEAT;
    return tick(tickIndex);
}

export function tickPlus(first: Tick, second: Tick): Tick {
    return tick(first.index + second.index);
}

export function tickSubtract(first: Tick, second: Tick): Tick {
    return tick(first.index - second.index);
}

export function tickRangeContains(needle: TickRange, haystack: TickRange): boolean {
    const haystackEnd = tickPlus(haystack.start, haystack.duration);
    const needleEnd = tickPlus(needle.start, needle.duration);
    return (
        (
            needle.start.index >= haystack.start.index &&
            needle.start.index <= haystackEnd.index
        ) &&
        (
            needleEnd.index <= haystackEnd.index &&
            needleEnd.index >= haystack.start.index
        )
    )
}

export function inTickRange(tick: Tick, tickRange: TickRange): boolean {
    const haystackEnd = tickPlus(tickRange.start, tickRange.duration);
    return (
        tick.index >= tickRange.start.index &&
        tick.index < haystackEnd.index
    )
}

export function clampTickRange(haystack: TickRange, needle: TickRange): TickRange {
    let start = needle.start;
    let duration = needle.duration;

    if (haystack.start.index > start.index) {
        const cliped = tickSubtract(haystack.start, start)
        start = haystack.start;
        duration = tickSubtract(needle.duration, cliped);
    }

    const haystackEnd = tickPlus(haystack.start, haystack.duration);
    const end = tickPlus(start, duration);

    if (end.index > haystackEnd.index) {
        const cliped = tickSubtract(end, haystackEnd);
        duration = tickSubtract(duration, cliped);
    }


    return {
        start,
        duration,
    };
}

export function quanitize(resolution: Tick, tick: Tick, tempo: Tempo): Tick {
    const time = tickTime(tick, tempo);
    const toneTime = new ToneTime(time.seconds);
    const quanitizeTick = tickTime(resolution, tempo);
    const quantizedTime = Time.fromSeconds(toneTime.quantize(quanitizeTick.seconds));
    return timeToTick(quantizedTime, tempo);
}

export function ceil(resolution: Tick, tick: Tick, tempo: Tempo): Tick {
    const quanitized = quanitize(resolution, tick, tempo);
    if (quanitized.index < tick.index) {
        return tickPlus(quanitized, resolution);
    }
    return quanitized;
}

export function floor(resolution: Tick, tick: Tick, tempo: Tempo): Tick {
    const quanitized = quanitize(resolution, tick, tempo);
    if (quanitized.index > tick.index) {
        return tickSubtract(quanitized, resolution);
    }
    return quanitized;
}


/*
 *
 *
 *  Pixel Conversions
 *
 */

export function pixelToTick(frame: Frame, range: TickRange, pixel: number): Tick {
    const { width } = frame;
    const percent = (pixel / width);

    const index = percent * range.duration.index;
    return tick(index);
}

export function absolutePixelToTick(frame: Frame, range: TickRange, pixel: number): Tick {
    const tick = pixelToTick(frame, range, pixel);
    return tickPlus(tick, range.start);
}
