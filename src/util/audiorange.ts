import { Time, sum as sumTime, gt, subtract as subtractTime, Beat, LiveTime, beatToTime } from './time';
import { Tempo } from 'store/project';

export class AudioRange {
    start: Time;
    duration: Time;
    constructor(start: Time | LiveTime, duration: Time) {
        if (!(start instanceof Time) && !(start instanceof LiveTime)) {
            throw new Error(`Invalid start time for AudioRange. "${start}" is not a valid instance of Time`);
        }

        if (!(duration instanceof Time)) {
            throw new Error(`Invalid duration time for AudioRange. "${duration}" is not a valid instance of Time`);
        }
        this.start = start;
        this.duration = duration;
    }

    get end() {
        return this.start.add(this.duration);
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

        return new AudioRange(beatStartTime, beatDurationTime);
    }
}

export function divideBeatRange(range: BeatRange, resolution: Beat): Beat[] {
    const { duration } = range;
    const beats: Beat[] = [];
    for(let i = 0; i < duration.index; i += resolution.index) {
        beats.push(new Beat(i));
    }
    return beats;
}

export function contains(needle: AudioRange, haystack: AudioRange): boolean {
    return (
        (
            (
                needle.start.greaterThan(haystack.start) ||
                needle.start.equals(haystack.start)
            ) &&
            (
                needle.start.lessThan(haystack.end) ||
                needle.start.equals(haystack.end)
            )
        ) &&
        (
            (
                needle.end.lessThan(haystack.end) ||
                needle.end.equals(haystack.end)
            ) &&
            (
                needle.end.greaterThan(haystack.start) ||
                needle.end.equals(haystack.start)
            )
        )
    )
}
