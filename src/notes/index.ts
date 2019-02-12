import { DrumMachineNote } from './drummachine';
import { BeatLabelNote } from './beatlabel';
export enum NoteVariant {
    DrumMachineNote,
    BeatLabelNote,
}

export type NoteViewData = DrumMachineNote | BeatLabelNote;
