import { PianoKey, Note } from "util/sound";

export interface PianoKeyboard {
    pianoKey: PianoKey;
    note: Note;
}

export enum KeyboardVariant {
    Piano
}

export type KeyboardData = PianoKeyboard;
