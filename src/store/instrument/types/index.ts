import { Time } from "util/time";
import { Observable } from "rxjs";
import { PianoKey } from "util/sound";

export enum InstrumentType {
    DrumMachine = 'Drum Machine',
    Oscillator = 'Oscillator',
}

export interface InstrumentRenderer {
    audioContext: BaseAudioContext;
    type: InstrumentType;
    trigger(key: PianoKey, when: Time, offset: Time, duration: Time): Observable<any>;
    connect(node: AudioNode): void;
}
