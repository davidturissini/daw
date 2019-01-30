import { InstrumentRenderer, InstrumentType } from './index';
import { AudioRange } from 'util/audiorange';

export class Oscillator implements InstrumentRenderer {
    type: InstrumentType.Oscillator;
    audioContext: AudioContext;
    dest: AudioNode | null = null;
    constructor(audioContext: AudioContext) {
        this.audioContext = audioContext;
    }
    trigger(frequency: number, range: AudioRange) {
        const { audioContext } = this;
        return new Promise<never>((res) => {
            const node = audioContext.createOscillator();
            node.frequency.setValueAtTime(frequency, 0);
            node.start(
                range.start.seconds
            );
            node.stop(
                range.start.plus(range.duration).seconds
            );
            node.onended = () => res();
            if (this.dest) {
                node.connect(this.dest);
            }
        });

    }

    connect(node: AudioNode) {
        this.dest = node;
    }
}
