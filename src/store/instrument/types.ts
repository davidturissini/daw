import { Time } from "util/time";
import { Observable } from "rxjs";
import { PianoKey } from "util/sound";

export enum InstrumentType {
    DrumMachine = 'Drum Machine',
    Synth = 'Synth',
}

export interface InstrumentAudioNode {
    audioContext: BaseAudioContext;
    type: InstrumentType;
    trigger(key: PianoKey, when: Time, offset: Time | null, duration: Time | null): Observable<any>;
    connect(node: AudioNode): void;
}
