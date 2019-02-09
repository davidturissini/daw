import { Time, sum as sumTime, gt, subtract as subtractTime, Beat, beatToTime, timeToBeat, createBeat } from './time';
import { Tempo } from 'store/project';


export interface AudioRange {
    start: Time;
    duration: Time;
}

export function toBeatRange(range: AudioRange, tempo: Tempo): BeatRange {
    const start = timeToBeat(range.start, tempo);
    const duration = timeToBeat(range.duration, tempo);
    return new BeatRange(start, duration);
}

export function toAudioRange(tempo: Tempo): AudioRange {
    return this;
}

export function relative(targetRange, absoluteRange): AudioRange {
    const start = subtractTime(absoluteRange.start, targetRange.start);
    return {
        start,
        duration: absoluteRange.duration,
    };
}

export function split(targetRange, relativeRange) {
    const firstStart = targetRange.start;
    const firstDuration = relativeRange.start;

    const splitEnd = sumTime(firstStart, sumTime(firstDuration, relativeRange.duration));
    const secondStart = splitEnd;
    const secondDuration = subtractTime(targetRange.duration, sumTime(firstDuration, relativeRange.duration));

    return [
        {
            start: firstStart,
            duration: firstDuration,
        },
        {
            start: secondStart,
            duration: secondDuration,
        }
    ];
}

export function clamp(haystack, needle) {
    let start = needle.start;
    let duration = needle.duration;

    if (gt(haystack.start, start)) {
        const cliped = subtractTime(haystack.start, start)
        start = haystack.start;
        duration = subtractTime(needle.duration, cliped);
    }

    const haystackEnd = sumTime(haystack.start, haystack.duration);
    const end = sumTime(start, duration);

    if (gt(end, haystackEnd)) {
        const cliped = subtractTime(end, haystackEnd);
        duration = subtractTime(duration, cliped);
    }


    return {
        start,
        duration,
    };
}


export class BeatRange {
    start: Beat;
    duration: Beat;
    constructor(start: Beat, duration: Beat) {
        this.start = start;
        this.duration = duration;
    }

    toAudioRange(tempo: Tempo) {
        const beatStartTime = beatToTime(this.start, tempo);
        const beatDurationTime = beatToTime(this.duration, tempo);

        return { start: beatStartTime, duration: beatDurationTime };
    }

    toBeatRange(tempo: Tempo) {
        return this;
    }
}

export function divideBeatRange(range: BeatRange, resolution: Beat): Beat[] {
    const { duration } = range;
    const beats: Beat[] = [];
    for(let i = 0; i < duration.index; i += resolution.index) {
        beats.push(createBeat(i));
    }
    return beats;
}

export function containsTime(time: Time, range: AudioRange): boolean {
    const rangeEnd = range.start.plus(range.duration);
    return (
        (
            (
                time.greaterThan(range.start) ||
                time.equals(range.start)
            ) &&
            (
                time.lessThan(rangeEnd) ||
                time.equals(rangeEnd)
            )
        )
    )
}

export function contains(needle: AudioRange, haystack: AudioRange): boolean {
    const haystackEnd = haystack.start.plus(haystack.duration);
    const needleEnd = needle.start.plus(needle.duration);
    return (
        (
            (
                needle.start.greaterThan(haystack.start) ||
                needle.start.equals(haystack.start)
            ) &&
            (
                needle.start.lessThan(haystackEnd) ||
                needle.start.equals(haystackEnd)
            )
        ) &&
        (
            (
                needleEnd.lessThan(haystackEnd) ||
                needleEnd.equals(haystackEnd)
            ) &&
            (
                needleEnd.greaterThan(haystack.start) ||
                needleEnd.equals(haystack.start)
            )
        )
    )
}
