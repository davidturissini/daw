
export class Time {
    milliseconds: number;
    constructor(milliseconds: number) {
        this.milliseconds = milliseconds;
    }

    get seconds() {
        return this.milliseconds / 1000;
    }

    static fromSeconds(seconds) {
        return new Time(seconds * 1000);
    }

    add(time) {
        return sum(this, time);
    }

    plus(time) {
        return this.add(time);
    }

    subtract(time) {
        return subtract(this, time);
    }

    minus(time) {
        return this.subtract(time);
    }

    greaterThan(time) {
        return gt(this, time);
    }

    lessThan(time) {
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

export function beatToTime(beat: Beat, bpm: number): Time {
    const beatsPerSecond = 60 / bpm;
    const seconds = beatsPerSecond * beat.index;
    return Time.fromSeconds(seconds);
}
