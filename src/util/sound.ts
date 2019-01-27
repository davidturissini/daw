import { AudioRange } from 'util/audiorange';

interface Note {
    frequency: number;
    sharp: boolean;
}

export interface MidiNote {
    id: string;
    note: string;
    range: AudioRange;
}

export const notes: { [key: string]: Note } = {
    'c3': {
        frequency: 130.8,
        sharp: false,
    },
    'c#3': {
        frequency: 138.6,
        sharp: true,
    },
    'd3': {
        frequency: 146.8,
        sharp: false,
    },
    'd#3': {
        frequency: 155.6,
        sharp: true,
    },
    'e3': {
        frequency: 164.8,
        sharp: false,
    },
    'f3': {
        frequency: 174.6,
        sharp: false,
    },
    'f#3': {
        frequency: 185,
        sharp: true,
    },
    'g3': {
        frequency: 196,
        sharp: false,
    },
    'g#3': {
        frequency: 207.7,
        sharp: true,
    },
    'a3': {
        frequency: 220.0,
        sharp: false,
    },
    'a#3': {
        frequency: 223.1,
        sharp: true,
    },
    'b3': {
        frequency: 246.9,
        sharp: false,
    },

    'c4': {
        frequency: 261.6,
        sharp: false,
    },
    'c#4': {
        frequency: 277.2,
        sharp: true,
    },
    'd4': {
        frequency: 293.7,
        sharp: false,
    },
    'd#4': {
        frequency: 311.1,
        sharp: true,
    },
    'e4': {
        frequency: 329.6,
        sharp: false,
    },
    'f4': {
        frequency: 349.2,
        sharp: false,
    },
    'f#4': {
        frequency: 370.0,
        sharp: true,
    },
    'g4': {
        frequency: 392.0,
        sharp: false,
    },
    'g#4': {
        frequency: 415.3,
        sharp: true,
    },
    'a4': {
        frequency: 440.0,
        sharp: false,
    },
    'a#4': {
        frequency: 466.2,
        sharp: true,
    },
    'b4': {
        frequency: 493.9,
        sharp: false,
    },
}

export const audioContext = new AudioContext();
