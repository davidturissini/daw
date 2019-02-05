import { BeatRange } from 'util/audiorange';
import Tone from 'tone';

interface Note {
    frequency: number;
    sharp: boolean;
}

export interface MidiNote {
    id: string;
    note: string;
    range: BeatRange;
    velocity: number;
}

export enum PianoKey {
    A0 = 'A0',
    Asharp0 = 'Asharp0',
    B0 = 'B0',

    C1 = 'C1',
    Csharp1 = 'Csharp1',
    D1 = 'D1',
    Dsharp1 = 'Dsharp1',
    E1 = 'E1',
    F1 = 'F1',
    Fsharp1 = 'Fsharp1',
    G1 = 'G1',
    Gsharp1 = 'Gsharp1',
    A1 = 'A1',
    Asharp1 = 'Asharp1',
    B1 = 'B1',

    C2 = 'C2',
    Csharp2 = 'Csharp2',
    D2 = 'D2',
    Dsharp2 = 'Dsharp2',
    E2 = 'E2',
    F2 = 'F2',
    Fsharp2 = 'Fsharp2',
    G2 = 'G2',
    Gsharp2 = 'Gsharp2',
    A2 = 'A2',
    Asharp2 = 'Asharp2',
    B2 = 'B2',

    C3 = 'C3',
    Csharp3 = 'Csharp3',
    D3 = 'D3',
    Dsharp3 = 'Dsharp3',
    E3 = 'E3',
    F3 = 'F3',
    Fsharp3 = 'Fsharp3',
    G3 = 'G3',
    Gsharp3 = 'Gsharp3',
    A3 = 'A3',
    Asharp3 = 'Asharp3',
    B3 = 'B3',

    C4 = 'C4',
    Csharp4 = 'Csharp4',
    D4 = 'D4',
    Dsharp4 = 'Dsharp4',
    E4 = 'E4',
    F4 = 'F4',
    Fsharp4 = 'Fsharp4',
    G4 = 'G4',
    Gsharp4 = 'Gsharp4',
    A4 = 'A4',
    Asharp4 = 'Asharp4',
    B4 = 'B4',

    C5 = 'C5',
    Csharp5 = 'Csharp5',
    D5 = 'D5',
    Dsharp5 = 'Dsharp5',
    E5 = 'E5',
    F5 = 'F5',
    Fsharp5 = 'Fsharp5',
    G5 = 'G5',
    Gsharp5 = 'Gsharp5',
    A5 = 'A5',
    Asharp5 = 'Asharp5',
    B5 = 'B5',

    C6 = 'C6',
    Csharp6 = 'Csharp6',
    D6 = 'D6',
    Dsharp6 = 'Dsharp6',
    E6 = 'E6',
    F6 = 'F6',
    Fsharp6 = 'Fsharp6',
    G6 = 'G6',
    Gsharp6 = 'Gsharp6',
    A6 = 'A6',
    Asharp6 = 'Asharp6',
    B6 = 'B6',

    C7 = 'C7',
    Csharp7 = 'Csharp7',
    D7 = 'D7',
    Dsharp7 = 'Dsharp7',
    E7 = 'E7',
    F7 = 'F7',
    Fsharp7 = 'Fsharp7',
    G7 = 'G7',
    Gsharp7 = 'Gsharp7',
    A7 = 'A7',
    Asharp7 = 'Asharp7',
    B7 = 'B7',

    C8 = 'C8',
}

export const notes: { [ K in PianoKey]: Note } = {
    [PianoKey.A0]: {
        frequency: 27.5,
        sharp: false,
    },
    [PianoKey.Asharp0]: {
        frequency: 29.14,
        sharp: true,
    },
    [PianoKey.B0]: {
        frequency: 30.87,
        sharp: false,
    },


    [PianoKey.C1]: {
        frequency: 32.7,
        sharp: false,
    },
    [PianoKey.Csharp1]: {
        frequency: 34.65,
        sharp: true,
    },
    [PianoKey.D1]: {
        frequency: 36.71,
        sharp: false,
    },
    [PianoKey.Dsharp1]: {
        frequency: 38.89,
        sharp: true,
    },
    [PianoKey.E1]: {
        frequency: 41.2,
        sharp: false,
    },
    [PianoKey.F1]: {
        frequency: 43.65,
        sharp: false,
    },
    [PianoKey.Fsharp1]: {
        frequency: 46.25,
        sharp: true,
    },
    [PianoKey.G1]: {
        frequency: 49,
        sharp: false,
    },
    [PianoKey.Gsharp1]: {
        frequency: 51.91,
        sharp: true,
    },
    [PianoKey.A1]: {
        frequency: 55,
        sharp: false,
    },
    [PianoKey.Asharp1]: {
        frequency: 58.27,
        sharp: true,
    },
    [PianoKey['B1']]: {
        frequency: 61.74,
        sharp: false,
    },


    [PianoKey['C2']]: {
        frequency: 65.41,
        sharp: false,
    },
    [PianoKey.Csharp2]: {
        frequency: 69.3,
        sharp: true,
    },
    [PianoKey['D2']]: {
        frequency: 73.42,
        sharp: false,
    },
    [PianoKey.Dsharp2]: {
        frequency: 77.78,
        sharp: true,
    },
    [PianoKey['E2']]: {
        frequency: 82.41,
        sharp: false,
    },
    [PianoKey['F2']]: {
        frequency: 87.31,
        sharp: false,
    },
    [PianoKey.Fsharp2]: {
        frequency: 92.50,
        sharp: true,
    },
    [PianoKey['G2']]: {
        frequency: 98,
        sharp: false,
    },
    [PianoKey.Gsharp2]: {
        frequency: 103.8,
        sharp: true,
    },
    [PianoKey['A2']]: {
        frequency: 110,
        sharp: false,
    },
    [PianoKey.Asharp2]: {
        frequency: 116.5,
        sharp: true,
    },
    [PianoKey['B2']]: {
        frequency: 123.5,
        sharp: false,
    },


    [PianoKey['C3']]: {
        frequency: 130.8,
        sharp: false,
    },
    [PianoKey.Csharp3]: {
        frequency: 138.6,
        sharp: true,
    },
    [PianoKey['D3']]: {
        frequency: 146.8,
        sharp: false,
    },
    [PianoKey.Dsharp3]: {
        frequency: 155.6,
        sharp: true,
    },
    [PianoKey['E3']]: {
        frequency: 164.8,
        sharp: false,
    },
    [PianoKey['F3']]: {
        frequency: 174.6,
        sharp: false,
    },
    [PianoKey.Fsharp3]: {
        frequency: 185,
        sharp: true,
    },
    [PianoKey['G3']]: {
        frequency: 196,
        sharp: false,
    },
    [PianoKey.Gsharp3]: {
        frequency: 207.7,
        sharp: true,
    },
    [PianoKey['A3']]: {
        frequency: 220.0,
        sharp: false,
    },
    [PianoKey.Asharp3]: {
        frequency: 223.1,
        sharp: true,
    },
    [PianoKey['B3']]: {
        frequency: 246.9,
        sharp: false,
    },

    [PianoKey['C4']]: {
        frequency: 261.6,
        sharp: false,
    },
    [PianoKey.Csharp4]: {
        frequency: 277.2,
        sharp: true,
    },
    [PianoKey['D4']]: {
        frequency: 293.7,
        sharp: false,
    },
    [PianoKey.Dsharp4]: {
        frequency: 311.1,
        sharp: true,
    },
    [PianoKey['E4']]: {
        frequency: 329.6,
        sharp: false,
    },
    [PianoKey['F4']]: {
        frequency: 349.2,
        sharp: false,
    },
    [PianoKey.Fsharp4]: {
        frequency: 370.0,
        sharp: true,
    },
    [PianoKey['G4']]: {
        frequency: 392.0,
        sharp: false,
    },
    [PianoKey.Gsharp4]: {
        frequency: 415.3,
        sharp: true,
    },
    [PianoKey['A4']]: {
        frequency: 440.0,
        sharp: false,
    },
    [PianoKey.Asharp4]: {
        frequency: 466.2,
        sharp: true,
    },
    [PianoKey['B4']]: {
        frequency: 493.9,
        sharp: false,
    },


    [PianoKey['C5']]: {
        frequency: 523.3,
        sharp: false,
    },
    [PianoKey.Csharp5]: {
        frequency: 554.4,
        sharp: true,
    },
    [PianoKey['D5']]: {
        frequency: 587.3,
        sharp: false,
    },
    [PianoKey.Dsharp5]: {
        frequency: 622.3,
        sharp: true,
    },
    [PianoKey['E5']]: {
        frequency: 659.3,
        sharp: false,
    },
    [PianoKey['F5']]: {
        frequency: 698.5,
        sharp: false,
    },
    [PianoKey.Fsharp5]: {
        frequency: 740,
        sharp: true,
    },
    [PianoKey['G5']]: {
        frequency: 784,
        sharp: false,
    },
    [PianoKey.Gsharp5]: {
        frequency: 830.6,
        sharp: true,
    },
    [PianoKey['A5']]: {
        frequency: 880,
        sharp: false,
    },
    [PianoKey.Asharp5]: {
        frequency: 932.3,
        sharp: true,
    },
    [PianoKey['B5']]: {
        frequency: 987.8,
        sharp: false,
    },


    [PianoKey['C6']]: {
        frequency: 1047,
        sharp: false,
    },
    [PianoKey.Csharp6]: {
        frequency: 1109,
        sharp: true,
    },
    [PianoKey['D6']]: {
        frequency: 1175,
        sharp: false,
    },
    [PianoKey.Dsharp6]: {
        frequency: 1245,
        sharp: true,
    },
    [PianoKey['E6']]: {
        frequency: 1319,
        sharp: false,
    },
    [PianoKey['F6']]: {
        frequency: 1397,
        sharp: false,
    },
    [PianoKey.Fsharp6]: {
        frequency: 1480,
        sharp: true,
    },
    [PianoKey['G6']]: {
        frequency: 1568,
        sharp: false,
    },
    [PianoKey.Gsharp6]: {
        frequency: 1661,
        sharp: true,
    },
    [PianoKey['A6']]: {
        frequency: 1760,
        sharp: false,
    },
    [PianoKey.Asharp6]: {
        frequency: 1865,
        sharp: true,
    },
    [PianoKey['B6']]: {
        frequency: 1976,
        sharp: false,
    },


    [PianoKey['C7']]: {
        frequency: 2093,
        sharp: false,
    },
    [PianoKey.Csharp7]: {
        frequency: 2217,
        sharp: true,
    },
    [PianoKey['D7']]: {
        frequency: 2349,
        sharp: false,
    },
    [PianoKey.Dsharp7]: {
        frequency: 2489,
        sharp: true,
    },
    [PianoKey['E7']]: {
        frequency: 2637,
        sharp: false,
    },
    [PianoKey['F7']]: {
        frequency: 2794,
        sharp: false,
    },
    [PianoKey.Fsharp7]: {
        frequency: 2960,
        sharp: true,
    },
    [PianoKey['G7']]: {
        frequency: 3136,
        sharp: false,
    },
    [PianoKey.Gsharp7]: {
        frequency: 3322,
        sharp: true,
    },
    [PianoKey['A7']]: {
        frequency: 3529,
        sharp: false,
    },
    [PianoKey.Asharp7]: {
        frequency: 3729,
        sharp: true,
    },
    [PianoKey['B7']]: {
        frequency: 3951,
        sharp: false,
    },

    [PianoKey['C8']]: {
        frequency: 4186,
        sharp: false,
    },
}

let ac: AudioContext | null = null;

export function getAudioContext(): AudioContext {
    if (ac === null) {
        ac = new AudioContext();
        Tone.setContext(ac);
    }
    return ac;
}
