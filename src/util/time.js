
export class Time {
    constructor(milliseconds) {
        this.milliseconds = milliseconds;
    }

    get seconds() {
        return this.milliseconds / 1000;
    }

    static fromSeconds(seconds) {
        return new Time(seconds * 1000);
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
