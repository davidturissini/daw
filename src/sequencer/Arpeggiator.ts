import { Instrument } from 'store/instrument';
import { notes } from 'util/sound';
import { Time } from 'util/time';

const base = 0.46875;
const quarter = base / 4;
const eighth = base / 8;

export class Arpeggiator {
    instrument: Instrument;
    audioContext: AudioContext;
    constructor(audioContext: AudioContext, instrument: Instrument) {
        this.instrument = instrument;
        this.audioContext = audioContext;
    }

    playNote(when: number, duration: number, frequency: number) {
        const { audioContext, instrument } = this;
        const node = audioContext.createOscillator();
        node.type = instrument.data.type;
        node.detune.setValueAtTime(instrument.data.detune, audioContext.currentTime);
        node.frequency.setValueAtTime(notes['c4'], audioContext.currentTime);
        node.start(when);
        node.stop(when + duration)
        node.connect(audioContext.destination);

        node.onended = () => {
            const timePassed = audioContext.currentTime - when;
            const nextTime = audioContext.currentTime + (base - timePassed);
            this.playNote(nextTime, base / 2, frequency);
        }
    }

    start(time: Time) {
        const { audioContext } = this;
        this.playNote(audioContext.currentTime, base / 2, notes['a4']);
    }

    stop(time: Time) {

    }
}
