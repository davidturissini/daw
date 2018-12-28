import { sum as sumTime, gt, subtract as subtractTime } from './time';

export class AudioRange {
    constructor(start, duration) {
        this.start = start;
        this.duration = duration;
    }
}

export function clamp(haystack, needle) {
    let start = needle.start;
    let duration = needle.duration;

    if (gt(haystack.start, start)) {
        const cliped = subtractTime(haystack.start, start)
        start = haystack.start;
        duration = subtractTime(needle.duration, cliped);
        console.log(duration);
    }

    const haystackEnd = sumTime(haystack.start, haystack.duration);
    const end = sumTime(start, duration);

    if (gt(end, haystackEnd)) {
        const cliped = subtractTime(end, haystackEnd);
        duration = subtractTime(duration, cliped);
    }


    return new AudioRange(start, duration);

}
