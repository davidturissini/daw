
export class Time {
    milliseconds: number;
    constructor(milliseconds: number) {
        this.milliseconds = milliseconds;
    }

    get seconds() {
        return this.milliseconds / 1000;
    }

    static fromSeconds(seconds: number) {
        return new Time(seconds * 1000);
    }

    add(time: Time) {
        return sum(this, time);
    }

    plus(time: Time) {
        return this.add(time);
    }

    subtract(time: Time) {
        return subtract(this, time);
    }

    minus(time: Time) {
        return this.subtract(time);
    }

    greaterThan(time: Time) {
        return gt(this, time);
    }

    lessThan(time: Time) {
        return lt(this, time);
    }

    invert() {
        return invert(this);
    }
}

export function sum(first, second) {
    return new Time(first.milliseconds + second.milliseconds);
}

export function invert(time) {
    return new Time(-time.milliseconds);
}

export function gt(left, right) {
    return left.milliseconds > right.milliseconds;
}

export function lt(left, right) {
    return left.milliseconds < right.milliseconds;
}

export function subtract(first, second) {
    return sum(first, invert(second));
}

export const timeZero = new Time(0);

export class Beat {
    index: number;
    constructor(index: number) {
        this.index = index;
    }
}

export function timeToBeat(time: Time, bpm: number): Beat {
    const secondsPerBeat = bpm / 60;
    const index = time.seconds * secondsPerBeat;
    return new Beat(index);
}

export function beatToTime(beat: Beat, bpm: number): Time {
    const beatsPerSecond = 60 / bpm;
    const seconds = beatsPerSecond * beat.index;
    return Time.fromSeconds(seconds);
}
