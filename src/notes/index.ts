import { DrumMachineNote } from './drummachine';
import { BeatLabelNote } from './beatlabel';
import { MidiNoteViewData } from './midinote';
export enum NoteVariant {
    DrumMachineNote,
    BeatLabelNote,
    MidiNote,
}

export type NoteViewData = DrumMachineNote | BeatLabelNote | MidiNoteViewData;
