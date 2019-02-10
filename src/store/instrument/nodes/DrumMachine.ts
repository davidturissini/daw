import { InstrumentAudioNode, InstrumentType } from './../types';
import { Beat, Time, createBeat } from 'util/time';
import { Record } from 'immutable';
import { PianoKey } from 'util/sound';
import { Sampler as ToneSampler } from 'tone';

export class DrumMachineData extends Record<{
    sampleNames: {
        [PianoKey.C3]: string | null;
        [PianoKey.Csharp3]: string | null;
        [PianoKey.D3]: string | null;
        [PianoKey.Dsharp3]: string | null;
        [PianoKey.E3]: string | null;
        [PianoKey.F3]: string | null;
        [PianoKey.Fsharp3]: string | null;
        [PianoKey.G3]: string | null;
    }
}>({
    sampleNames: {
        [PianoKey.C3]: null,
        [PianoKey.Csharp3]: null,
        [PianoKey.D3]: null,
        [PianoKey.Dsharp3]: null,
        [PianoKey.E3]: null,
        [PianoKey.F3]: null,
        [PianoKey.Fsharp3]: null,
        [PianoKey.G3]: null,
    }
}) {}

export class DrumMachineLoopData extends Record<{
    resolution: Beat,
}>({
    resolution: createBeat(1 / 4),
}) {}

export class DrumMachine implements InstrumentAudioNode<DrumMachineData> {
    type: InstrumentType.DrumMachine;
    audioContext: BaseAudioContext;
    dest: AudioNode | null = null;
    resolution: Beat;
    duration: Beat;
    sampler: ToneSampler;

    constructor() {
        this.sampler = new ToneSampler({
            [PianoKey.C3]: '/samples/DDE Kick 1.wav',
            [PianoKey.Csharp3]: '/samples/DDE Snare 4.wav',
            [PianoKey.D3]: '/samples/DDE HiHat 1.wav',
        })
    }

    trigger(key: PianoKey, velocity: number, when: Time, offset: Time | null, duration: Time | null) {
        if (this.dest) {
            this.sampler.connect(this.dest);
        }
        if (duration !== null) {
            let normalizedDuration = duration;

            if (offset !== null) {
                normalizedDuration = normalizedDuration.minus(offset);
            }
            this.sampler.triggerAttackRelease(key, duration.seconds, when.seconds, velocity);
        } else {
            this.sampler.triggerAttack([key]);
        }
    }

    connect(node: AudioNode) {
        this.dest = node;
    }

    release() {

    }

    update() {

    }
}
