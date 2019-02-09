import { LightningElement, wire, api } from 'lwc';
import { generateId } from 'util/uniqueid';
import { appStore, wireSymbol } from 'store/index';
import { PianoMidiNoteMap } from 'cmp/piano/piano';
import { MidiNote, PianoKey, notes, getAudioContext } from 'util/sound';
import { AudioRange, BeatRange, divideBeatRange } from 'util/audiorange';
import { timeZero, beatToTime, Beat, timeToBeat, Time, createBeat } from 'util/time';
import { ProjectState } from 'store/project/reducer';
import { Instrument, InstrumentData } from 'store/instrument';
import { InstrumentState } from 'store/instrument/reducer';
import { InstrumentType } from 'store/instrument/types';
import { DrumMachineLoopData, DrumMachineData } from 'store/instrument/nodes/DrumMachine';
import { Loop } from 'store/loop';
import { LoopState } from 'store/loop/reducer';
import { createLoopNote, deleteLoopNote, setLoopNoteRange, setLoopDuration } from 'store/loop/action';
import { Map as ImmutableMap } from 'immutable';
import { Color } from 'util/color';
import { AudioRangeCreatedEvent, AudioRangeChangeEvent, GridRangeChangeEvent } from 'cmp/grid/events';

interface DrumMachineNotesGrid {
    id: string;
    title: string | null,
    notes: Array<{
        className: string,
        id: string,
        noteId: string;
        buttonColor: Color | null;
    }>
}


export default class LoopEditElement extends LightningElement {
    @api loopId: string;

    @wire(wireSymbol, {
        paths: {
            project: ['project'],
            instruments: ['instrument', 'items'],
            loop: ['loop', 'items']
        }
    })
    storeData: {
        data: {
            loop: LoopState['items'];
            project: ProjectState;
            instruments: InstrumentState['items'];
        },
    }

    get project() {
        return this.storeData.data.project;
    }

    get loop(): Loop {
        const { loopId } = this;
        return this.storeData.data.loop.get(loopId) as Loop;
    }

    get loopRange(): AudioRange | null {
        return {
            start: timeZero,
            duration: beatToTime(this.loop.duration, this.project.currentProject!.tempo),
        };
    }

    instrument<T extends InstrumentData>(): Instrument<T> {
        return this.storeData.data.instruments.get(this.loop.instrumentId) as Instrument<T>;
    }

    get instrumentIsDrumMachine() {
        return this.instrument().type === InstrumentType.DrumMachine;
    }

    get instrumentIsOscillator() {
        return this.instrument().type === InstrumentType.Synth;
    }

    /*
     *
     *  Drum Machine
     *
     */
    get drumMachineKeys(): DrumMachineNotesGrid[] {
        const { loop } = this;
        const data = loop.data as DrumMachineLoopData;
        const instrument = this.instrument<DrumMachineData>();

        const { resolution } = data;
        const beatTimes = divideBeatRange(new BeatRange(createBeat(0), loop.duration), resolution);
        const { frequency: lowerFrequency } = notes[PianoKey.C3];
        const { frequency: upperFrequency } = notes[PianoKey.G3];
        return Object.keys(PianoKey).filter((key: PianoKey) => {
            const { frequency } = notes[key];
            return (frequency >= lowerFrequency && frequency <= upperFrequency);
        })
        .map((key: PianoKey) => {
            const notesForKey = loop.notes.get(key, ImmutableMap()).toList().toArray() as MidiNote[];
            const title = instrument.data.sampleNames[key];
            return {
                id: key,
                title: title,
                notes: beatTimes.map((beat, index) => {
                    let classNames = ['sample'];
                    const note = notesForKey.find((note) => {
                        return note.range.start.index === beat.index;
                    });

                    const noteIsOn = note !== undefined;

                    if (noteIsOn) {
                        classNames.push('switch--selected');
                    }

                    return {
                        noteId: note !== undefined ? note.id : '',
                        className: classNames.join(' '),
                        id: index + '',
                        buttonColor: noteIsOn ? new Color(95, 197, 254) : null,
                    }
                })
            }
        })
    }

    get drumMachineSampleLabels(): string[] {
        const { loop } = this;
        const data = loop.data as DrumMachineLoopData;
        const { resolution } = data;

        return divideBeatRange(new BeatRange(createBeat(0), loop.duration), resolution).map((beat, index) => {
            return `${index} / 4`;
        });
    }

    onBeatClick(evt: MouseEvent) {
        const { loop } = this;
        const data = loop.data as DrumMachineLoopData;
        const { resolution } = data;

        const target = evt.target as HTMLElement;
        const keyId = target.getAttribute('data-key-id') as PianoKey;
        const beatIndex = parseInt(target.getAttribute('data-beat-index') as string, 10);
        const range = new BeatRange(createBeat(beatIndex * resolution.index), resolution);
        const noteId = target.getAttribute('data-id') as string;
        if (noteId !== '') {
            appStore.dispatch(
                deleteLoopNote(this.loopId, noteId, keyId),
            );
        } else {
            appStore.dispatch(
                createLoopNote(this.loopId, generateId(), keyId, range),
            );
        }
    }

    /*
     *
     *  Synth
     *
     */
    get canClosePianoGrid() {
        return true;
    }

    get pianoMidiNotes(): MidiNote[] {
        const { loop } = this;
        if (!loop) {
            return [];
        }

        const obj = loop.notes.reduce((seed: MidiNote[], note: ImmutableMap<string, MidiNote>) => {
            return seed.concat(
                note.valueSeq().toList().toArray()
            );
        }, []);
        return obj;
    }

    onOscillatorNoteCreated(evt: AudioRangeCreatedEvent) {
        const { id, rowIndex, beatRange } = evt.detail;
        const keys = Object.keys(notes);
        const key = keys[rowIndex];
        appStore.dispatch(
            createLoopNote(this.loopId, id, key as PianoKey, beatRange),
        );
    }

    onOscillatorNoteRangeChange(evt: AudioRangeChangeEvent) {
        const { id, rowIndex, beatRange } = evt.detail;
        const keys = Object.keys(notes);
        const key = keys[rowIndex];
        appStore.dispatch(
            setLoopNoteRange(this.loopId, key as PianoKey, id, beatRange)
        );
    }

    onPianoGridRangeChange(evt: GridRangeChangeEvent) {
        const { range } = evt.detail;
        appStore.dispatch(
            setLoopDuration(this.loopId, timeToBeat(range.duration, this.project.currentProject!.tempo))
        );
    }

    get pianoNotes() {
        return notes;
    }

    get pianoInstrumentId() {
        return this.instrument<any>().id;
    }

    get projectTempo() {
        return this.storeData.data.project.currentProject!.tempo;
    }

    get pianoAudioContext() {
        return getAudioContext();
    }

    get loopCurrentTimeIsVisible() {
        return false;
    }

    get loopCurrentTime(): Time | null {
        return null;
    }
}
