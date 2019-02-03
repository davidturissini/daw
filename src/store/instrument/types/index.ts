import { Time } from "util/time";
import { Observable } from "rxjs";
import { PianoKey } from "util/sound";
import { Record } from "immutable";


export class DrumMachineData extends Record<{
    sampleNames: {
        [PianoKey.C3]: string | null;
        [PianoKey.Csharp3]: string | null;
        [PianoKey.D3]: string | null;
        [PianoKey.Dsharp3]: string | null;
        [PianoKey.E3]: string | null;
        [PianoKey.F3]: string | null;
        [PianoKey.Fsharp3]: string | null;
        [PianoKey.G3]: string | null;
    }
}>({
    sampleNames: {
        [PianoKey.C3]: null,
        [PianoKey.Csharp3]: null,
        [PianoKey.D3]: null,
        [PianoKey.Dsharp3]: null,
        [PianoKey.E3]: null,
        [PianoKey.F3]: null,
        [PianoKey.Fsharp3]: null,
        [PianoKey.G3]: null,
    }
}) {}

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
