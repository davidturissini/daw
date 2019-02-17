import { InstrumentAudioNode, InstrumentType } from '../types';
import { PianoKey } from 'util/sound';
import { Time } from 'util/time';
import { Record } from 'immutable';
import { AudioNode as ToneAudioNode, OscillatorType as ToneOscillatorType, DuoSynth } from 'tone';

export class DuoSynthData extends Record<{
    vibratoAmount: number;
    vibratoRate: number;
    harmonicity: number;
    voice0: {
        volume: number;
        portamento: number;
        oscillator: {
            type: ToneOscillatorType;
        },
        filterEnvelope: {
            attack: number;
            decay: number;
            sustain: number;
            release: number;
        },
        envelope: {
            attack: number;
            decay: number;
            sustain: number;
            release: number;
        }
    },
    voice1: {
        volume: number;
        portamento: number;
        oscillator: {
            type: ToneOscillatorType;
        },
        filterEnvelope: {
            attack: number;
            decay: number;
            sustain: number;
            release: number;
        },
        envelope: {
            attack: number;
            decay: number;
            sustain: number;
            release: number;
        }
    }
}>({
    vibratoAmount: 0.5,
    vibratoRate: 5,
    harmonicity: 1.5,
    voice0: {
        volume: -10,
        portamento: 0,
        oscillator: {
            type: 'sine',
        },
        filterEnvelope: {
            attack: 0.01,
            decay: 0,
            sustain: 1,
            release: 0.5,
        },
        envelope: {
            attack: 0.01,
            decay: 0,
            sustain: 1,
            release: 0.5,
        }
    },
    voice1: {
        volume: -10,
        portamento: 0,
        oscillator: {
            type: 'sine',
        },
        filterEnvelope: {
            attack: 0.01,
            decay: 0,
            sustain: 1,
            release: 0.5,
        },
        envelope: {
            attack: 0.01,
            decay: 0,
            sustain: 1,
            release: 0.5,
        }
    }
}){ }

export class DuoSynthLoopData extends Record<{

}>({

}) {}

export class DuoSynthNode implements InstrumentAudioNode<DuoSynthData> {
    type: InstrumentType.DuoSynth;
    synth: DuoSynth;
    constructor(data: DuoSynthData) {
        this.synth = new DuoSynth(data);
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

    update(data: DuoSynthData) {
        const { synth } = this;
        synth.vibratoAmount.setValueAtTime(data.vibratoAmount, 0);
        synth.vibratoRate.setValueAtTime(data.vibratoRate, 0);
        synth.harmonicity.setValueAtTime(data.harmonicity, 0);

        synth.voice0.volume.setValueAtTime(data.voice0.volume, 0);
        synth.voice0.portamento = data.voice0.portamento;
        synth.voice0.oscillator.type = data.voice0.oscillator.type;

        synth.voice0.filterEnvelope.attack = data.voice0.filterEnvelope.attack;
        synth.voice0.filterEnvelope.decay = data.voice0.filterEnvelope.decay;
        synth.voice0.filterEnvelope.sustain = data.voice0.filterEnvelope.sustain;
        synth.voice0.filterEnvelope.release = data.voice0.filterEnvelope.release;

        synth.voice0.envelope.attack = data.voice0.envelope.attack;
        synth.voice0.envelope.decay = data.voice0.envelope.decay;
        synth.voice0.envelope.sustain = data.voice0.envelope.sustain;
        synth.voice0.envelope.release = data.voice0.envelope.release;


        synth.voice1.volume.setValueAtTime(data.voice0.volume, 0);
        synth.voice1.portamento = data.voice0.portamento;
        synth.voice1.oscillator.type = data.voice0.oscillator.type;

        synth.voice1.filterEnvelope.attack = data.voice0.filterEnvelope.attack;
        synth.voice1.filterEnvelope.decay = data.voice0.filterEnvelope.decay;
        synth.voice1.filterEnvelope.sustain = data.voice0.filterEnvelope.sustain;
        synth.voice1.filterEnvelope.release = data.voice0.filterEnvelope.release;

        synth.voice1.envelope.attack = data.voice0.envelope.attack;
        synth.voice1.envelope.decay = data.voice0.envelope.decay;
        synth.voice1.envelope.sustain = data.voice0.envelope.sustain;
        synth.voice1.envelope.release = data.voice0.envelope.release;

    }
}
