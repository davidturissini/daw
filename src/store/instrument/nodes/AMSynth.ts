import { InstrumentAudioNode, InstrumentType } from '../types';
import { PianoKey } from 'util/sound';
import { Time } from 'util/time';
import { Record } from 'immutable';
import { AMSynth, AudioNode as ToneAudioNode, OscillatorType as ToneOscillatorType, BasicOscillatorType } from 'tone';

export class AMSynthData extends Record<{
    harmonicity: number,
    detune: number,
    oscillator: {
        type: BasicOscillatorType
    },
    envelope: {
        attack: number,
        decay: number;
        sustain: number,
        release: number,
    },
    modulation: {
        type: BasicOscillatorType
    },
    modulationEnvelope: {
        attack: number,
        decay: number,
        sustain: number,
        release: number,
    }
}>({
    harmonicity: 3,
    detune: 0,
    oscillator: {
        type: 'sine'
    },
    envelope: {
        attack: 0.01,
        decay: 0.01,
        sustain: 1,
        release: 0.5,
    },
    modulation: {
        type: 'square'
    },
    modulationEnvelope: {
        attack: 0.5,
        decay: 0,
        sustain: 1,
        release: 0.5,
    }
}){ }

export class AMSynthLoopData extends Record<{

}>({

}) {}

export class AMSynthNode implements InstrumentAudioNode<AMSynthData> {
    type: InstrumentType.AMSynth;
    synth: AMSynth;
    constructor(data: AMSynthData) {
        this.synth = new AMSynth(data);
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

    update(data: AMSynthData) {
        const { synth } = this;
        synth.oscillator.type = data.oscillator.type;
        synth.detune.setValueAtTime(data.detune, 0);
        synth.harmonicity.setValueAtTime(data.harmonicity, 0);
        synth.envelope.attack = data.envelope.attack;
        synth.envelope.decay = data.envelope.decay;
        synth.envelope.sustain = data.envelope.sustain;
        synth.envelope.release = data.envelope.release;

        synth.modulation.type = data.modulation.type;

        synth.modulationEnvelope.attack = data.modulationEnvelope.attack;
        synth.modulationEnvelope.decay = data.modulationEnvelope.decay;
        synth.modulationEnvelope.sustain = data.modulationEnvelope.sustain;
        synth.modulationEnvelope.release = data.modulationEnvelope.release;
    }
}
