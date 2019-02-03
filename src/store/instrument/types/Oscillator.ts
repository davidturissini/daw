import { InstrumentRenderer, InstrumentType } from './index';
import { PianoKey, notes } from 'util/sound';
import { Time } from 'util/time';
import { Observable } from 'rxjs';
import { Record } from 'immutable';

export class OscillatorData extends Record<{}>({

}){ }

export class OscillatorLoopData extends Record<{

}>({

}) {}

export class Oscillator implements InstrumentRenderer {
    type: InstrumentType.Oscillator;
    audioContext: AudioContext;
    dest: AudioNode | null = null;
    constructor(audioContext: AudioContext) {
        this.audioContext = audioContext;
    }
    trigger(key: PianoKey, when: Time, offset: Time, duration: Time) {
        const { audioContext } = this;
        const node = audioContext.createOscillator();
        const { frequency } = notes[key];
        node.frequency.setValueAtTime(frequency, 0);

        return Observable.create((o) => {
            node.start(when.seconds);
            node.stop(duration.minus(offset).seconds);

            if (this.dest) {
                node.connect(this.dest);
            }

            node.onended = () => o.complete();
            return () => {
                node.onended = () => {}
                node.disconnect();
                node.stop();
            }
        });

    }

    connect(node: AudioNode) {
        this.dest = node;
    }
}
