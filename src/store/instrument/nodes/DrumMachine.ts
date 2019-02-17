import { InstrumentAudioNode, InstrumentType } from './../types';
import { Beat, Time, createBeat } from 'util/time';
import { Record } from 'immutable';
import { PianoKey } from 'util/sound';
import { Sampler as ToneSampler, AudioNode as ToneAudioNode } from 'tone';

export enum AttackReleaseCurve {
    linear = 'linear',
    exponential = 'exponential',
}

export class DrumMachineData extends Record<{
    attack: number;
    release: number;
    curve: AttackReleaseCurve;
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
    },
    attack: 0,
    release: 0.1,
    curve: AttackReleaseCurve.exponential,
}) {}

export class DrumMachineLoopData extends Record<{
    resolution: Beat,
}>({
    resolution: createBeat(1 / 4),
}) {}

export class DrumMachine implements InstrumentAudioNode<DrumMachineData> {
    type: InstrumentType.DrumMachine;
    audioContext: BaseAudioContext;
    resolution: Beat;
    duration: Beat;
    sampler: ToneSampler;

    constructor(data: DrumMachineData) {
        this.sampler = new ToneSampler({
            [PianoKey.C3]: '/samples/808-Kicks08.wav',
            [PianoKey.Csharp3]: '/samples/808-Snare08.wav',
            [PianoKey.D3]: '/samples/808-HiHats10.wav',

            [PianoKey.Dsharp3]: '/samples/808-OpenHiHats09.wav',
            [PianoKey.E3]: '/samples/808-Tom5.wav',
            [PianoKey.F3]: '/samples/808-Rim2.wav',
            [PianoKey.Fsharp3]: '/samples/808-Ride3.wav',
            [PianoKey.G3]: '/samples/808-Clap08.wav',
        });
        this.update(data);
    }

    trigger(key: PianoKey, velocity: number, when: Time, offset: Time | null, duration: Time | null) {
        if (duration !== null) {
            let normalizedDuration = duration;

            if (offset !== null) {
                normalizedDuration = normalizedDuration.minus(offset);
            }
            this.sampler.triggerAttackRelease(key, duration.seconds, when.seconds, velocity);
        } else {
            this.sampler.triggerAttack(key);
        }
    }

    release() {
        this.sampler.releaseAll()
    }

    connect(node: ToneAudioNode) {
        this.sampler.connect(node);
    }

    update(data: DrumMachineData) {
        const { sampler } = this;
        sampler.attack = data.attack;
        sampler.release = data.release;
        (sampler as any).curve = data.curve;
    }
}
