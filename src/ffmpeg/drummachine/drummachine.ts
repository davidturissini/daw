import { LightningElement, api, track } from 'lwc';
import { PianoKey, MidiNote } from 'util/sound';
import { Tempo } from 'store/project';
import { ButtonGroupValueChangeEvent, ButtonGroupButton } from 'cmp/buttongroup/buttongroup';
import { TickRange, QUARTER_BEAT, Tick, divideTickRange, ZERO_BEAT, FOUR_BEAT, tickRangeContains, inTickRange } from 'store/tick';
import { AudioWindowGridRow, AudioWindowGridTickRange } from 'cmp/audiowindowgrid/audiowindowgrid';
import { Frame } from 'util/geometry';
import { DrumMachineNote } from 'notes/drummachine';
import { NoteVariant } from 'notes/index';

export default class DrumMachine extends LightningElement {
    @api notes: MidiNote[];
    @api tempo: Tempo;
    @api range: TickRange;
    @api resolution: Tick = QUARTER_BEAT;
    @api loopId: string;
    @api currentTime: Tick | null = null;
    @track loopIndex: number = 0;

    get visibleRange(): TickRange {
        return {
            start: ZERO_BEAT,
            duration: FOUR_BEAT,
        }
    }

    get windowGridPadding(): Frame {
        return {
            width: 10,
            height: 10,
        };
    }

    get drumTickRanges(): AudioWindowGridTickRange<DrumMachineNote>[] {
        const { notes, range, resolution, drumMachineKeys, currentTime } = this;
        return drumMachineKeys.reduce((seed: AudioWindowGridTickRange<DrumMachineNote>[], { pianoKey }, index: number) => {
            const divided: AudioWindowGridTickRange<DrumMachineNote>[] = divideTickRange(range, resolution).map((tickRange: TickRange) => {
                const existingNote = notes.find((note) => {
                    return note.range.start.index === tickRange.start.index && note.note === pianoKey;
                });
                const noteId = (existingNote !== undefined) ? existingNote.id : undefined;

                let isPlaying = false;
                if(currentTime && existingNote) {
                    isPlaying = inTickRange(currentTime, existingNote.range);
                }
                const vm: AudioWindowGridTickRange<DrumMachineNote> = {
                    rowId: pianoKey,
                    range: tickRange,
                    variant: NoteVariant.DrumMachineNote,
                    data: {
                        isPlaying,
                        noteId,
                        key: pianoKey,
                    }
                };
                return vm;
            })
            return seed.concat(divided);
        }, []);
    }

    get drumMachineKeys() {
        return [{
            pianoKey: PianoKey.C3,
            label: 'Drum'
        }, {
            pianoKey: PianoKey.Csharp3,
            label: 'Snare'
        }, {
            pianoKey: PianoKey.D3,
            label: 'closed Hihat'
        }, {
            pianoKey: PianoKey.Dsharp3,
            label: 'open hihat'
        }, {
            pianoKey: PianoKey.E3,
            label: 'tom'
        }, {
            pianoKey: PianoKey.F3,
            label: 'rim'
        }, {
            pianoKey: PianoKey.Fsharp3,
            label: 'ride'
        }, {
            pianoKey: PianoKey.G3,
            label: 'clap'
        }]
    }


    get audioWindowGridRows(): AudioWindowGridRow<PianoKey, { label: string }>[] {
        return [{
            id: PianoKey.C3,
            data: {
                label: 'Drum'
            },
            frame: { width: 150, height: 20 }
        }, {
            id: PianoKey.Csharp3,
            data: {
                label: 'Snare',
            },
            frame: { width: 150, height: 20 }
        }, {
            id: PianoKey.D3,
            data: {
                label: 'closed Hihat',
            },
            frame: { width: 150, height: 20 }
        }, {
            id: PianoKey.Dsharp3,
            data: {
                label: 'open hihat',
            },
            frame: { width: 150, height: 20 }
        }, {
            id: PianoKey.E3,
            data: {
                label: 'tom',
            },
            frame: { width: 150, height: 20 }
        }, {
            id: PianoKey.F3,
            data: {
                label: 'rim',
            },
            frame: { width: 150, height: 20 }
        }, {
            id: PianoKey.Fsharp3,
            data: {
                label: 'ride',
            },
            frame: { width: 150, height: 20 }
        }, {
            id: PianoKey.G3,
            data: {
                label: 'clap',
            },
            frame: { width: 150, height: 15 }
        }]
    }

    get loopIndexButtons(): ButtonGroupButton<number>[] {
        return [{
            value: 0,
            text: '1'
        },{
            value: 1,
            text: '2'
        },{
            value: 2,
            text: '3'
        },{
            value: 3,
            text: '4'
        }]
    }

    onLoopIndexChange(evt: ButtonGroupValueChangeEvent<number>) {
        const { value } = evt.detail;
        this.loopIndex = value;
    }
}
