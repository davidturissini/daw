import { InstrumentAudioNode, InstrumentType } from '../types';
import { PianoKey } from 'util/sound';
import { Time } from 'util/time';
import { Record } from 'immutable';
import { AudioNode as ToneAudioNode, FMSynth, BasicOscillatorType, PolySynth } from 'tone';

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
    synth: PolySynth;
    constructor(data: FMSynthData) {
        this.synth = new PolySynth(4, FMSynth);
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

    update(data: FMSynthData) {
        this.synth.set(data.toJS());
    }
}
