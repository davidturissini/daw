import { InstrumentAudioNode, InstrumentType } from '../types';
import { PianoKey } from 'util/sound';
import { Time } from 'util/time';
import { Record } from 'immutable';
import { AudioNode as ToneAudioNode, MonoSynth, BasicOscillatorType, FilterType } from 'tone';

export class MonoSynthData extends Record<{
    frequency: PianoKey;
    detune: number;
    oscillator: {
        type: BasicOscillatorType;
    },
    filter: {
        Q: number;
        type: FilterType;
        rolloff: -12 | -24 | -48 | -96;
    };
    envelope: {
        attack: number;
        decay: number;
        sustain: number;
        release: number;
    },
    filterEnvelope: {
        attack: number;
        decay: number;
        sustain: number;
        release: number;
        baseFrequency: number;
        octaves: 7,
        exponent: number;
    }
}>({
    frequency: PianoKey.C3,
    detune: 0,
    oscillator: {
        type: 'square',
    },
    filter: {
        Q: 6,
        type: 'lowpass',
        rolloff: -24,
    },
    envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.9,
        release: 1,
    },
    filterEnvelope: {
        attack: 0.06,
        decay: 0.2,
        sustain: 0.5,
        release: 2,
        baseFrequency: 200,
        octaves: 7,
        exponent: 2,
    }
}){ }

export class MonoSynthLoopData extends Record<{

}>({

}) {}

export class MonoSynthNode implements InstrumentAudioNode<MonoSynthData> {
    type: InstrumentType.MonoSynth;
    synth: MonoSynth;
    constructor(data: MonoSynthData) {
        this.synth = new MonoSynth(data);
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
        if (this.synth) {
            this.synth.triggerRelease();
        }
    }

    connect(node: ToneAudioNode) {
        this.synth.connect(node);
    }

    update(data: MonoSynthData) {
        const { synth } = this;
        synth.frequency.setValueAtTime(data.frequency, 0);
        synth.detune.setValueAtTime(data.detune, 0);
        synth.oscillator.type = data.oscillator.type;

        synth.envelope.attack = data.envelope.attack;
        synth.envelope.decay = data.envelope.decay;
        synth.envelope.sustain = data.envelope.sustain;
        synth.envelope.release = data.envelope.release;

        synth.filter.Q.setValueAtTime(data.filter.Q, 0);
        synth.filter.type = data.filter.type;
        synth.filter.rolloff = data.filter.rolloff;

        synth.filterEnvelope.attack = data.filterEnvelope.attack;
        synth.filterEnvelope.decay = data.filterEnvelope.decay;
        synth.filterEnvelope.sustain = data.filterEnvelope.sustain;
        synth.filterEnvelope.release = data.filterEnvelope.release;

        synth.filterEnvelope.octaves = data.filterEnvelope.octaves;
        synth.filterEnvelope.exponent = data.filterEnvelope.exponent;

    }
}
