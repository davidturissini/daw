import { InstrumentAudioNode, InstrumentType } from '../types';
import { PianoKey } from 'util/sound';
import { Time } from 'util/time';
import { Record } from 'immutable';
import { AudioNode as ToneAudioNode, PluckSynth } from 'tone';

export class PluckSynthData extends Record<{
    attackNoise: number;
    dampening: number;
    resonance: number;
}>({
    attackNoise: 1,
    dampening: 4000,
    resonance: 0.7,
}){ }

export class PluckSynthLoopData extends Record<{

}>({

}) {}

export class PluckSynthNode implements InstrumentAudioNode<PluckSynthData> {
    type: InstrumentType.PluckSynth;
    synth: PluckSynth;
    constructor(data: PluckSynthData) {
        this.synth = new PluckSynth(data);
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

    release() {}

    connect(node: ToneAudioNode) {
        this.synth.connect(node);
    }

    update(data: PluckSynthData) {
        const { synth } = this;
        synth.attackNoise = data.attackNoise;
        synth.dampening.setValueAtTime(data.dampening, 0);
        synth.resonance.setValueAtTime(data.resonance, 0);
    }
}
