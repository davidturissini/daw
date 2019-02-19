import { InstrumentAudioNode, InstrumentType } from '../types';
import { PianoKey } from 'util/sound';
import { Time } from 'util/time';
import { Record } from 'immutable';
import { NoiseSynth, AudioNode as ToneAudioNode, NoiseType } from 'tone';

export class NoiseSynthData extends Record<{
    noiseType: NoiseType,
    attack: number,
    decay: number,
    sustain: number,
}>({
    noiseType: 'white',
    attack: 0.005,
    decay: 0.1,
    sustain: 0.3,
}){ }

export class NoiseSynthLoopData extends Record<{

}>({

}) {}
export class NoiseSynthNode implements InstrumentAudioNode<NoiseSynthData> {
    type: InstrumentType.NoiseSynth;
    synth: NoiseSynth;
    constructor(data: NoiseSynthData) {
        this.synth = new NoiseSynth({
            noise: {
                type: data.noiseType,
            },
            envelope: {
                attack: data.attack,
                sustain: data.sustain,
                decay: data.decay,
            }
        });
    }
    trigger(key: PianoKey, velocity: number, when: Time, offset: Time | null, duration: Time | null) {
        if (duration !== null) {
            let normalizedDuration = duration;

            if (offset !== null) {
                normalizedDuration = normalizedDuration.minus(offset);
            }
            this.synth.triggerAttackRelease(duration.seconds, when.seconds, velocity);
        } else {
            this.synth.triggerAttack(0, velocity);
        }
    }

    release() {
        if (this.synth) {
            this.synth.triggerRelease(0);
        }
    }

    connect(node: ToneAudioNode) {
        this.synth.connect(node);
    }

    update(data: NoiseSynthData) {
        const { synth } = this;
        const { attack, sustain, decay, noiseType } = data;
        synth.envelope.attack = attack;
        synth.envelope.sustain = sustain;
        synth.envelope.decay = decay;
        synth.noise.type = noiseType;
    }
}
