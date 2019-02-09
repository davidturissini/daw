import { LightningElement, api } from 'lwc';
import { PianoKey, MidiNote } from 'util/sound';
import { BeatRange, divideBeatRange, AudioRange } from 'util/audiorange';
import { createBeat, Beat, beatToTime, timeZero, Time } from 'util/time';
import { Tempo } from 'store/project';

interface DrumMachineNoteViewModel {
    key: string;
    beat: Beat;
    rowId: PianoKey;
    range: AudioRange;
}

export default class DrumMachine extends LightningElement {
    @api notes: MidiNote[];
    @api tempo: Tempo;

    get range() {
        return {
            start: timeZero,
            duration: new Time(2000),
        }
    }

    get drumNotes(): DrumMachineNoteViewModel[] {
        const { tempo } = this;
        const beatRange = new BeatRange(createBeat(0), createBeat(4));

        const value = this.drumMachineKeys.reduce((seed: DrumMachineNoteViewModel[], { pianoKey }) => {
            const divided: DrumMachineNoteViewModel[] = divideBeatRange(beatRange, createBeat(1 / 4)).map((beat: Beat) => {
                const range: AudioRange = {
                    start: beatToTime(beat, tempo),
                    duration: beatToTime(createBeat(1 / 4), tempo)
                }
                return {
                    key: `${pianoKey}-${beat.index}`,
                    beat,
                    rowId: pianoKey,
                    range,
                } as DrumMachineNoteViewModel;
            })
            return seed.concat(divided);
        }, []);
        console.log('value', value)
        return value;
    }

    get drumMachineKeys() {
        return [{
            pianoKey: PianoKey.C3
        }, {
            pianoKey: PianoKey.Csharp3
        }]
    }
}
