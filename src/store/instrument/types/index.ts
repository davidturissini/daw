import { Time } from "util/time";
import { Observable } from "rxjs";

export enum InstrumentType {
    DrumMachine = 'Drum Machine',
    Oscillator = 'Oscillator',
}

export interface InstrumentRenderer<K> {
    audioContext: BaseAudioContext;
    type: InstrumentType;
    trigger(key: K, when: Time, offset: Time, duration: Time): Observable<any>;
    connect(node: AudioNode): void;
}
