import { PianoKey } from "util/sound";

export interface DrumMachineNote {
    isPlaying: boolean;
    key: PianoKey;
    noteId?: string;
}
