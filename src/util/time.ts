import { Tempo } from "store/project";

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

    add(time: Time): Time {
        return sum(this, time);
    }

    plus(time: Time): Time {
        return this.add(time);
    }

    subtract(time: Time): Time {
        return subtract(this, time);
    }

    minus(time: Time): Time {
        return this.subtract(time);
    }

    greaterThan(time: Time): boolean {
        return gt(this, time);
    }

    lessThan(time: Time): boolean {
        return lt(this, time);
    }

    invert(): Time {
        return invert(this);
    }

    equals(time: Time) {
        return this.milliseconds === time.milliseconds;
    }
}

interface CurrentTimeable {
    currentTime: number;
}

export class LiveTime implements Time {
    source: CurrentTimeable;
    offset: number;
    constructor(source: CurrentTimeable, milliseconds?: number) {
        this.source = source;
        this.offset = milliseconds || 0;
    }

    get milliseconds() {
        return (this.source.currentTime * 1000) + this.offset;
    }

    get seconds() {
        return this.source.currentTime + (this.offset / 1000);
    }

    snapshot() {
        return new Time(this.milliseconds);
    }

    add(time: Time): LiveTime {
        return new LiveTime(this.source, this.offset + time.milliseconds);
    }

    plus(time: Time): LiveTime {
        return this.add(time);
    }

    subtract(time: Time): LiveTime {
        return new LiveTime(this.source, this.offset - time.milliseconds);
    }

    minus(time: Time): LiveTime {
        return this.subtract(time);
    }

    greaterThan(time: Time): boolean {
        return gt(this, time);
    }

    lessThan(time: Time): boolean {
        return lt(this, time);
    }

    invert(): LiveTime {
        return new LiveTime(this.source, -this.offset);
    }

    equals(time: Time) {
        return this.milliseconds === time.milliseconds;
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

export interface Beat {
    index: number;
}

export function createBeat(index: number): Beat {
    return {
        index,
    }
}

export function timeToBeat(time: Time, tempo: Tempo): Beat {
    const index = time.seconds * tempo.secondsPerBeat;
    return createBeat(index);
}

export function beatToTime(beat: Beat, tempo: Tempo): Time {
    const seconds = tempo.beatsPerSecond * beat.index;
    return Time.fromSeconds(seconds);
}
