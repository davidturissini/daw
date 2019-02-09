import { Beat, Time, timeToBeat, beatToTime, LiveTime, createBeat } from "util/time";
import { Tempo } from "store/project";
import { Transport } from "tone";

export class Clock {
    transport: Transport;
    audioContextStartTime: Time;
    tempo: Tempo;
    constructor(transport: Transport, tempo: Tempo) {
        this.tempo = tempo;
        this.transport = transport;
        this.audioContextStartTime = Time.fromSeconds(transport.seconds);
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
        return createBeat((roundedBeatIndex + 1) * 4);
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
        const barStart = createBeat(currentBeat.index - mod);
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
        return new LiveTime({ get currentTime() { return Transport.seconds }});
    }
}
