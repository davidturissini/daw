import { InstrumentAudioNode, InstrumentType } from '../types';
import { PianoKey } from 'util/sound';
import { Time } from 'util/time';
import { Record } from 'immutable';
import { AudioNode as ToneAudioNode, MetalSynth } from 'tone';

export class MetalSynthData extends Record<{
    frequency: number;
    envelope: {
        attack: number;
        decay: number;
        release: number;
    };
    harmonicity: number;
    modulationIndex: number;
    resonance: number;
    octaves: number;
}>({
    frequency: 200,
    envelope: {
        attack: 0.001,
        decay: 1.4,
        release: 0.2,
    },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5,
}){ }

export class MetalSynthLoopData extends Record<{

}>({

}) {}

export class MetalSynthNode implements InstrumentAudioNode<MetalSynthData> {
    type: InstrumentType.MonoSynth;
    synth: MetalSynth;
    constructor(data: MetalSynthData) {
        this.synth = new MetalSynth(data);
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
        this.synth.triggerRelease(0);
    }

    connect(node: ToneAudioNode) {
        this.synth.connect(node);
    }

    update(data: MetalSynthData) {
        const { synth } = this;
        synth.frequency.setValueAtTime(data.frequency, 0);

        synth.envelope.attack = data.envelope.attack;
        synth.envelope.decay = data.envelope.decay;
        synth.envelope.release = data.envelope.release;

        synth.harmonicity.setValueAtTime(data.harmonicity, 0);
        synth.modulationIndex.setValueAtTime(data.modulationIndex, 0);

        synth.resonance = data.resonance;
        synth.octaves = data.octaves;
    }
}
