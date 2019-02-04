import { InstrumentAudioNode, InstrumentType } from '../types';
import { PianoKey, notes } from 'util/sound';
import { Time } from 'util/time';
import { Observable } from 'rxjs';
import { Record } from 'immutable';
import { Synth, PolySynth } from 'tone';

export class SynthData extends Record<{}>({

}){ }

export class SynthLoopData extends Record<{

}>({

}) {}
export class SynthNode implements InstrumentAudioNode {
    type: InstrumentType.Synth;
    audioContext: BaseAudioContext;
    dest: AudioNode | null = null;
    synth: PolySynth;
    constructor(audioContext: BaseAudioContext) {
        this.audioContext = audioContext;

        this.synth = new PolySynth(4, Synth);
    }
    trigger(key: PianoKey, when: Time, offset: Time | null, duration: Time | null) {
        const { audioContext } = this;

        // const node = audioContext.createOscillator();
        // const { frequency } = notes[key];
        // node.frequency.setValueAtTime(frequency, 0);

        if (this.dest) {
            // node.connect(this.dest);
            this.synth.connect(this.dest);
        }

        // node.start(when.seconds);

        if (duration !== null) {
            let normalizedDuration = duration;

            if (offset !== null) {
                normalizedDuration = normalizedDuration.minus(offset);
            }
            this.synth.triggerAttackRelease(key, duration.seconds, when.seconds);
        } else {
            this.synth.triggerAttack([key]);
        }
    }

    connect(node: AudioNode) {
        this.dest = node;
    }
}
