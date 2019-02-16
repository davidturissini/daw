import { LightningElement, api, track } from 'lwc';
import { PianoKey, MidiNote, notes } from 'util/sound';
import { Tempo } from 'store/project';
import { ButtonGroupValueChangeEvent, ButtonGroupButton } from 'cmp/buttongroup/buttongroup';
import { TickRange, QUARTER_BEAT, Tick, divideTickRange, inTickRange, tick, FOUR_BEAT, tickRange } from 'store/tick';
import { Frame } from 'util/geometry';
import { DrumMachineNote } from 'notes/drummachine';
import { NoteVariant } from 'notes/index';
import { KeyboardVariant, KeyboardNoteViewModel, KeyboardKeyViewModel } from 'cmp/keyboard/keyboard';
import { MidiNoteCreatedEvent } from 'event/midinotecreatedevent';
import { KeyboardRangeChangeEvent, keyboardRangeChangeEvent } from 'event/keyboardrangechange';

export default class DrumMachine extends LightningElement {
    @api notes: MidiNote[];
    @api tempo: Tempo;
    @api range: TickRange;
    @api resolution: Tick = QUARTER_BEAT;
    @api loopId: string;
    @api currentTime: Tick | null = null;
    @api instrumentId: string;
    @track loopIndex: number = 0;

    visibleRangeDuration: Tick = FOUR_BEAT;

    get visibleRange(): TickRange {
        return {
            start: tick(this.visibleRangeDuration.index * this.loopIndex),
            duration: this.visibleRangeDuration,
        }
    }

    get windowGridPadding(): Frame {
        return {
            width: 10,
            height: 10,
        };
    }

    get drumTickRanges(): KeyboardNoteViewModel<DrumMachineNote>[] {
        const { notes, visibleRange, resolution, drumMachineKeys, currentTime } = this;

        return drumMachineKeys.reduce((seed: KeyboardNoteViewModel<DrumMachineNote>[], { pianoKey }) => {
            const divided: KeyboardNoteViewModel<DrumMachineNote>[] = divideTickRange(visibleRange, resolution).map((tickRange: TickRange) => {
                const existingNote = notes.find((note) => {
                    return note.range.start.index === tickRange.start.index && note.note === pianoKey;
                });
                const noteId = (existingNote !== undefined) ? existingNote.id : undefined;

                let isPlaying = false;
                if(currentTime && existingNote) {
                    isPlaying = inTickRange(currentTime, existingNote.range);
                }
                const vm: KeyboardNoteViewModel<DrumMachineNote> = {
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

    get keyboardVariant() {
        return KeyboardVariant.DrumMachine;
    }

    get audioWindowGridRows(): KeyboardKeyViewModel<PianoKey, { label: string }>[] {
        return [{
            id: PianoKey.C3,
            pianoKey: PianoKey.C3,
            note: notes[PianoKey.C3],
            data: {
                label: 'Drum'
            },
            frame: { width: 150, height: 20 }
        }, {
            id: PianoKey.Csharp3,
            pianoKey: PianoKey.Csharp3,
            note: notes[PianoKey.Csharp3],
            data: {
                label: 'Snare',
            },
            frame: { width: 150, height: 20 }
        }, {
            id: PianoKey.D3,
            pianoKey: PianoKey.D3,
            note: notes[PianoKey.D3],
            data: {
                label: 'closed Hihat',
            },
            frame: { width: 150, height: 20 }
        }, {
            id: PianoKey.Dsharp3,
            pianoKey: PianoKey.Dsharp3,
            note: notes[PianoKey.Dsharp3],
            data: {
                label: 'open hihat',
            },
            frame: { width: 150, height: 20 }
        }, {
            id: PianoKey.E3,
            pianoKey: PianoKey.E3,
            note: notes[PianoKey.E3],
            data: {
                label: 'tom',
            },
            frame: { width: 150, height: 20 }
        }, {
            id: PianoKey.F3,
            pianoKey: PianoKey.F3,
            note: notes[PianoKey.F3],
            data: {
                label: 'rim',
            },
            frame: { width: 150, height: 20 }
        }, {
            id: PianoKey.Fsharp3,
            pianoKey: PianoKey.Fsharp3,
            note: notes[PianoKey.Fsharp3],
            data: {
                label: 'ride',
            },
            frame: { width: 150, height: 20 }
        }, {
            id: PianoKey.G3,
            pianoKey: PianoKey.G3,
            note: notes[PianoKey.G3],
            data: {
                label: 'clap',
            },
            frame: { width: 150, height: 15 }
        }]
    }

    get loopIndexButtons(): ButtonGroupButton<number>[] {
        return [{
            value: 0,
            text: '1',
            key: 0,
        },{
            value: 1,
            text: '2',
            key: 1,
        },{
            value: 2,
            text: '3',
            key: 2,
        },{
            value: 3,
            text: '4',
            key: 3,
        }]
    }

    onLoopIndexChange(evt: ButtonGroupValueChangeEvent<number>) {
        const { value } = evt.detail;
        this.loopIndex = value;
    }


    onDrumMidiNoteCreated(evt: MidiNoteCreatedEvent) {
        const { range } = evt.detail;
        if (range.start.index >= this.range.duration.index) {
            const nextRange = tickRange(this.range.start, tick(this.range.duration.index * 2));
            const rangeChangeEvent: KeyboardRangeChangeEvent = keyboardRangeChangeEvent(nextRange);
            this.dispatchEvent(rangeChangeEvent);
        }
    }
}
