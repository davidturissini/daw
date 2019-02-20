import { InstrumentAudioNode, InstrumentType } from '../types';
import { PianoKey } from 'util/sound';
import { Time } from 'util/time';
import { Record } from 'immutable';
import { AudioNode as ToneAudioNode, OscillatorType as ToneOscillatorType, DuoSynth, PolySynth } from 'tone';
import { Decibel } from 'units/decibel';

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
    synth: PolySynth;
    constructor(data: DuoSynthData) {
        this.synth = new PolySynth(4, DuoSynth);
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

    update(data: DuoSynthData) {
        this.synth.set(data.toJS());
    }

    setVolume(volume: Decibel) {
        this.synth.volume.setValueAtTime(volume.value, 0);
    }
}
