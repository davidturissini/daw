import { InstrumentAudioNode, InstrumentType } from '../types';
import { PianoKey } from 'util/sound';
import { Time } from 'util/time';
import { Record } from 'immutable';
import { AudioNode as ToneAudioNode, MonoSynth, BasicOscillatorType, FilterType, PolySynth } from 'tone';

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
    synth: PolySynth;
    constructor(data: MonoSynthData) {
        this.synth = new PolySynth(4, MonoSynth);
        this.update(data);
    }
    trigger(key: PianoKey, velocity: number, when: Time, offset: Time | null, duration: Time | null) {
        if (duration !== null) {
            let normalizedDuration = duration;

            if (offset !== null) {
                normalizedDuration = normalizedDuration.minus(offset);
            }
            this.synth.triggerAttackRelease(key, duration.seconds, when.seconds, velocity);
        } else {
            this.synth.triggerAttack([key]);
        }
    }

    release() {
        if (this.synth) {
            this.synth.releaseAll();
        }
    }

    connect(node: ToneAudioNode) {
        this.synth.connect(node);
    }

    update(data: MonoSynthData) {
        this.synth.set(data.toJS());
    }
}
