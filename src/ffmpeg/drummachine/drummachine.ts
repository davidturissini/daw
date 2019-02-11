import { LightningElement, api, track } from 'lwc';
import { PianoKey, MidiNote } from 'util/sound';
import { BeatRange, divideBeatRange, AudioRange, toBeatRange } from 'util/audiorange';
import { createBeat, Beat, beatToTime, timeZero, Time } from 'util/time';
import { Tempo } from 'store/project';
import { generateId } from 'util/uniqueid';
import { AudioRangeCreatedEvent } from 'cmp/grid/events';
import { Color } from 'util/color';
import { ButtonGroupValueChangeEvent, ButtonGroupButton } from 'cmp/buttongroup/buttongroup';

interface DrumMachineNoteViewModel {
    key: string;
    beat: Beat;
    rowId: PianoKey;
    range: AudioRange;
    rowIndex: number;
}

export default class DrumMachine extends LightningElement {
    @api notes: MidiNote[];
    @api tempo: Tempo;
    @api duration: Beat;
    @track loopIndex: number = 0;

    get spaceBetween() {
        return 20;
    }

    get range() {
        const { loopIndex } = this;
        const durationTime = beatToTime(this.duration, this.tempo);
        return {
            start: new Time(durationTime.milliseconds * loopIndex),
            duration: durationTime,
        }
    }

    get drumNotes(): DrumMachineNoteViewModel[] {
        const { tempo, notes, range } = this;
        const quarterBeat = createBeat(1 / 4);
        const beatRange = toBeatRange(range, tempo);
        return this.drumMachineKeys.reduce((seed: DrumMachineNoteViewModel[], { pianoKey }, index: number) => {
            const divided: DrumMachineNoteViewModel[] = divideBeatRange(beatRange, quarterBeat).map((beat: Beat) => {
                const start = beatToTime(beat, tempo);

                const existingNote = notes.find((note) => {
                    return note.range.start.index === beat.index && note.note === pianoKey;
                });

                const range: AudioRange = {
                    start,
                    duration: beatToTime(quarterBeat, tempo)
                }
                return {
                    color: existingNote === undefined ? new Color(61, 61, 61) : new Color(131, 131, 131),
                    key: `${pianoKey}-${beat.index}`,
                    beat,
                    rowId: pianoKey,
                    rowIndex: index,
                    range,
                } as DrumMachineNoteViewModel;
            })
            return seed.concat(divided);
        }, []);
    }

    onRangeClick(evt) {
        const rowIndex = parseInt(evt.target.getAttribute('data-row-index') as string, 10);
        const rangeId = generateId();
        const event: AudioRangeCreatedEvent = new CustomEvent('audiorangecreated', {
            bubbles: true,
            composed: true,
            detail: {
                range: evt.target.range as AudioRange,
                rowIndex,
                id: rangeId,
                beatRange: toBeatRange(evt.target.range, this.tempo),
            }
        });
        this.dispatchEvent(event);
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
