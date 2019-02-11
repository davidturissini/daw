import { InstrumentAudioNode, InstrumentType } from '../types';
import { PianoKey } from 'util/sound';
import { Time } from 'util/time';
import { Record } from 'immutable';
import { Synth, PolySynth, ProcessingNode } from 'tone';

export class SynthData extends Record<{
    oscillatorType: OscillatorType;
    attack: number;
    decay: number;
    sustain: number;
    release: number;
}>({
    oscillatorType: 'triangle',
    attack: 0.005,
    decay: 0.1,
    sustain: 0.3,
    release: 1,
}){ }

export class SynthLoopData extends Record<{

}>({

}) {}
export class SynthNode implements InstrumentAudioNode<SynthData> {
    type: InstrumentType.Synth;
    dest: ProcessingNode | null = null;
    synth: PolySynth;
    constructor(data: SynthData) {
        this.synth = new PolySynth(4, Synth);
        this.update(data);
    }
    trigger(key: PianoKey, velocity: number, when: Time, offset: Time | null, duration: Time | null) {
        if (this.dest) {
            this.synth.connect(this.dest);
        }
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

    connect(node: ProcessingNode) {
        this.dest = node;
    }

    update(data: SynthData) {
        const { synth } = this;
        synth.set({
            oscillator: {
                type: data.oscillatorType,
            },
            envelope: {
                attack: data.attack,
                sustain: data.sustain,
                release: data.release,
                decay: data.decay,
            }
        })
    }
}
