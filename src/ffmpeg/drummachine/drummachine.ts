import { LightningElement, api } from 'lwc';
import { PianoKey, MidiNote } from 'util/sound';
import { BeatRange, divideBeatRange, AudioRange, toBeatRange } from 'util/audiorange';
import { createBeat, Beat, beatToTime, timeZero } from 'util/time';
import { Tempo } from 'store/project';
import { generateId } from 'util/uniqueid';
import { AudioRangeCreatedEvent } from 'cmp/grid/events';
import { Color } from 'util/color';

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
    @api loopId: string;

    get range() {
        return {
            start: timeZero,
            duration: beatToTime(createBeat(4), this.tempo)
        }
    }

    get drumNotes(): DrumMachineNoteViewModel[] {
        const { tempo, notes } = this;
        const beatRange = new BeatRange(createBeat(0), createBeat(4));
        return this.drumMachineKeys.reduce((seed: DrumMachineNoteViewModel[], { pianoKey }, index: number) => {
            const divided: DrumMachineNoteViewModel[] = divideBeatRange(beatRange, createBeat(1 / 4)).map((beat: Beat) => {
                const start = beatToTime(beat, tempo);

                const existingNote = notes.find((note) => {
                    return note.range.start.index === beat.index && note.note === pianoKey;
                });

                const range: AudioRange = {
                    start,
                    duration: beatToTime(createBeat(1 / 4), tempo)
                }
                return {
                    color: existingNote === undefined ? null : new Color(255, 255, 255),
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
            pianoKey: PianoKey.C3
        }, {
            pianoKey: PianoKey.Csharp3
        }]
    }
}
