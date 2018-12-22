
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
