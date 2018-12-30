import { Time, sum as sumTime, gt, subtract as subtractTime } from './time';

export class AudioRange {
    constructor(start, duration) {
        if (!(start instanceof Time)) {
            throw new Error(`Invalid start time for AudioRange. "${start}" is not a valid instance of Time`);
        }

        if (!(duration instanceof Time)) {
            throw new Error(`Invalid duration time for AudioRange. "${duration}" is not a valid instance of Time`);
        }
        this.start = start;
        this.duration = duration;
    }
}

export function relative(targetRange, absoluteRange) {
    const start = subtractTime(absoluteRange.start, targetRange.start);
    return new AudioRange(start, absoluteRange.duration);
}

export function split(targetRange, relativeRange) {
    const firstStart = targetRange.start;
    const firstDuration = relativeRange.start;

    const splitEnd = sumTime(firstStart, sumTime(firstDuration, relativeRange.duration));
    const secondStart = splitEnd;
    const secondDuration = subtractTime(targetRange.duration, sumTime(firstDuration, relativeRange.duration));

    return [
        new AudioRange(
            firstStart,
            firstDuration,
        ),
        new AudioRange(
            secondStart,
            secondDuration,
        )
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


    return new AudioRange(start, duration);

}
