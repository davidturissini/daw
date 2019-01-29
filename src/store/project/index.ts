export class Tempo {
    beatsPerMinute: number;
    constructor(bpm: number) {
        this.beatsPerMinute = bpm;
    }

    get beatsPerSecond(): number {
        return 60 / this.beatsPerMinute;
    }

    get secondsPerBeat(): number {
        return this.beatsPerMinute / 60;
    }
}
