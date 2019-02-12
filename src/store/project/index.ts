import { Record } from 'immutable';

export class Tempo {
    beatsPerMinute: number;
    constructor(bpm: number) {
        this.beatsPerMinute = bpm;
    }

    get beatsPerSecond(): number {
        return this.beatsPerMinute / 60;
    }

    get secondsPerBeat(): number {
        return 60 / this.beatsPerMinute;
    }
}

export class Project extends Record<{
    name: string;
    tempo: Tempo;
}>({
    name: '',
    tempo: new Tempo(128)
}) {

}

