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
    audioContext: BaseAudioContext;
    dest: AudioNode | null = null;
    constructor(audioContext: BaseAudioContext) {
        this.audioContext = audioContext;
    }
    trigger(key: PianoKey, when: Time, offset: Time | null, duration: Time | null) {
        const { audioContext } = this;
        const node = audioContext.createOscillator();
        const { frequency } = notes[key];
        node.frequency.setValueAtTime(frequency, 0);

        return Observable.create((o) => {
            if (this.dest) {
                node.connect(this.dest);
            }

            node.start(when.seconds);

            if (duration !== null) {
                let stopTime = when.plus(duration);

                if (offset !== null) {
                    stopTime = stopTime.minus(offset);
                }
                node.stop(stopTime.seconds);
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
