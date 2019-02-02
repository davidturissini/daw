import { InstrumentRenderer, InstrumentType } from './index';
import { AudioRange } from 'util/audiorange';
import { Beat, Time } from 'util/time';
import { Tempo } from 'store/project';
import { Record } from 'immutable';
import { Observable } from 'rxjs';
import { getSamples } from 'store/sample';

function loadSample(note: DrumMachineNotes): AudioBuffer {
    const samples = getSamples();
    if (note === DrumMachineNotes.Zero) {
        return samples.drumKickAudioBuffer;
    } else if (note === DrumMachineNotes.One) {
        return samples.snareAudioBuffer;
    } else if (note === DrumMachineNotes.Two) {
        return samples.hiHatAudioBuffer;
    }

    throw new Error(`Buffer not found for note ${note}`);
}

export enum DrumMachineNotes {
    Zero = 'Zero',
    One = 'One',
    Two = 'Two',
    Three = 'Three',
    Four = 'Four',
    Five = 'Five',
    Six = 'Six',
    Seven = 'Seven',
    Eight = 'Eight',
}

export class DrumMachineLoopData extends Record<{
    resolution: Beat,
}>({
    resolution: new Beat(1 / 4),
}) {}

export class DrumMachine implements InstrumentRenderer<DrumMachineNotes> {
    type: InstrumentType.DrumMachine;
    audioContext: BaseAudioContext;
    dest: AudioNode | null = null;
    resolution: Beat;
    tempo: Tempo;
    duration: Beat;

    constructor(audioContext: BaseAudioContext, tempo: Tempo) {
        this.audioContext = audioContext;
        this.tempo = tempo;
    }
    trigger(key: DrumMachineNotes, when: Time, offset: Time, duration: Time) {
        const source = this.audioContext.createBufferSource();
        if (this.dest) {
            source.connect(this.dest);
        }
        source.buffer = loadSample(key);

        return Observable.create((o) => {
            source.onended = () => o.complete();
            source.start(when.seconds, offset.seconds, duration.seconds);

            return () => {
                source.onended = () => {}
                source.disconnect();
                source.stop();
            }
        });
    }

    connect(node: AudioNode) {
        this.dest = node;
    }
}
