import { InstrumentAudioNode, InstrumentType } from '../types';
import { PianoKey } from 'util/sound';
import { Time } from 'util/time';
import { Record } from 'immutable';
import { AudioNode as ToneAudioNode, FMSynth, BasicOscillatorType } from 'tone';

export class FMSynthData extends Record<{
    harmonicity: number;
    modulationIndex: number;
    detune: number;
    oscillator: {
        type: BasicOscillatorType;
    },
    envelope: {
        attack: number;
        decay: number;
        sustain: number;
        release: number;
    },
    modulation: {
        type: BasicOscillatorType;
    } ,
    modulationEnvelope: {
        attack: number;
        decay: number;
        sustain: number;
        release: number;
    }
}>({
    harmonicity: 3,
    modulationIndex: 10,
    detune: 0,
    oscillator: {
        type: 'sine',
    },
    envelope: {
        attack: 0.01,
        decay: 0.01,
        sustain: 1,
        release: 0.5,
    },
    modulation: {
        type: 'square',
    } ,
    modulationEnvelope: {
        attack: 0.5,
        decay: 0,
        sustain: 1,
        release: 0.5,
    }
}){ }

export class FMSynthLoopData extends Record<{

}>({

}) {}

export class FMSynthNode implements InstrumentAudioNode<FMSynthData> {
    type: InstrumentType.FMSynth;
    synth: FMSynth;
    constructor(data: FMSynthData) {
        this.synth = new FMSynth(data);
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

    update(data: FMSynthData) {
        const { synth } = this;
        synth.harmonicity.setValueAtTime(data.harmonicity, 0);
        synth.modulationIndex.setValueAtTime(data.modulationIndex, 0);
        synth.detune.setValueAtTime(data.detune, 0);
        synth.oscillator.type = data.oscillator.type;

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
