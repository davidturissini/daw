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

export const ZERO_BEAT = tick(0);
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
