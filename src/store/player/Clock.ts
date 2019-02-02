import { Beat, Time, timeToBeat, beatToTime, LiveTime } from "util/time";
import { Tempo } from "store/project";

export class Clock {
    audioContext: AudioContext;
    audioContextStartTime: Time;
    tempo: Tempo;
    constructor(audioContext: AudioContext, tempo: Tempo) {
        this.tempo = tempo;
        this.audioContext = audioContext;
        this.audioContextStartTime = Time.fromSeconds(this.audioContext.currentTime);
    }

    get currentTime(): Time {
        return this.audioContextTime().minus(this.audioContextStartTime).snapshot();
    }

    get currentBeat(): Beat {
        return timeToBeat(this.currentTime, this.tempo);
    }

    get nextBeat(): Beat {
        const { currentBeat } = this;
        const roundedBeatIndex = Math.floor(currentBeat.index / 4);
        return new Beat((roundedBeatIndex + 1) * 4);
    }

    get nextBeatTime(): Time {
        return beatToTime(this.nextBeat, this.tempo);
    }

    beatToTime(beat: Beat): Time {
        return beatToTime(beat, this.tempo);
    }

    timeSincePreviousBar(): Time {
        const { currentBeat, tempo } = this;
        const mod = currentBeat.index % 4;
        const barStart = new Beat(currentBeat.index - mod);
        return this.currentTime.minus(beatToTime(barStart, tempo));
    }

    timeUntilNextBar(): Time {
        const { currentBeat, tempo } = this;
        if (currentBeat.index % 4 === 0) {
            return beatToTime(currentBeat, tempo)
        }
        return beatToTime(this.nextBeat, tempo).minus(this.currentTime);
    }

    audioContextTime() {
        return new LiveTime(this.audioContext);
    }
}
