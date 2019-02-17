import { InstrumentAudioNode, InstrumentType } from '../types';
import { PianoKey } from 'util/sound';
import { Time } from 'util/time';
import { Record } from 'immutable';
import { AudioNode as ToneAudioNode, MembraneSynth, BasicOscillatorType, EnvelopeAttackCurve } from 'tone';

export class MembraneSynthData extends Record<{
    pitchDecay: number;
    octaves: number;
    oscillator: {
        type: BasicOscillatorType;
    },
    envelope: {
        attack: number;
        decay: number;
        sustain: number;
        release: number;
        attackCurve: EnvelopeAttackCurve;
    }
}>({
    pitchDecay: 0.05,
    octaves: 10,
    oscillator: {
        type: 'sine',
    },
    envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0.01,
        release: 1.4,
        attackCurve: 'exponential',
    }
}){ }

export class MembraneSynthLoopData extends Record<{

}>({

}) {}

export class MembraneSynthNode implements InstrumentAudioNode<MembraneSynthData> {
    type: InstrumentType.MembraneSynth;
    synth: MembraneSynth;
    constructor(data: MembraneSynthData) {
        this.synth = new MembraneSynth(data);
    }
    trigger(key: PianoKey, velocity: number, when: Time, offset: Time | null, duration: Time | null) {
        if (duration !== null) {
            let normalizedDuration = duration;

            if (offset !== null) {
                normalizedDuration = normalizedDuration.minus(offset);
            }
            this.synth.triggerAttackRelease(key, duration.seconds, when.seconds, velocity);
        } else {
            this.synth.triggerAttack(key);
        }
    }

    release() {
        this.synth.triggerRelease(0);
    }

    connect(node: ToneAudioNode) {
        this.synth.connect(node);
    }

    update(data: MembraneSynthData) {
        const { synth } = this;
        synth.pitchDecay = data.pitchDecay;
        synth.octaves = data.octaves;
        synth.oscillator.type = data.oscillator.type;

        synth.envelope.attack = data.envelope.attack;
        synth.envelope.decay = data.envelope.decay;
        synth.envelope.sustain = data.envelope.sustain;
        synth.envelope.release = data.envelope.release;

        synth.envelope.attackCurve = data.envelope.attackCurve;
    }
}
