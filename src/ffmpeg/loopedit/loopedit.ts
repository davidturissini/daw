import { LightningElement, track, wire, api } from 'lwc';
import { generateId } from 'util/uniqueid';
import { appStore, wireSymbol } from 'store/index';
import { createPiano } from 'store/piano/action';
import { PianoMidiNoteMap } from 'cmp/piano/piano';
import { MidiNote } from 'util/sound';
import { AudioRange, BeatRange, divideBeatRange } from 'util/audiorange';
import { timeZero, beatToTime, Beat } from 'util/time';
import { ProjectState } from 'store/project/reducer';
import { Instrument } from 'store/instrument';
import { InstrumentState } from 'store/instrument/reducer';
import { InstrumentType } from 'store/instrument/types';
import { DrumMachineNotes, DrumMachineLoopData } from 'store/instrument/types/DrumMachine';
import { Loop } from 'store/loop';
import { LoopState } from 'store/loop/reducer';
import { createLoopNote } from 'store/loop/action';
import { Map as ImmutableMap } from 'immutable';

interface DrumMachineNotesGrid {
    id: string;
    title: string | null,
    notes: Array<{
        className: string,
        id: string,
    }>
}


export default class LoopEditElement extends LightningElement {
    @track pianoId: string | null = null;
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

    loop<T extends string>(): Loop<T> {
        const { loopId } = this;
        return this.storeData.data.loop.get(loopId) as Loop<T>;
    }

    get loopRange(): AudioRange | null {
        return new AudioRange(timeZero, beatToTime(this.loop().duration, this.project.tempo));
    }

    instrument<T>(): Instrument<T> {
        return this.storeData.data.instruments.get(this.loop().instrumentId) as Instrument<T>;
    }

    get instrumentIsDrumMachine() {
        return this.instrument().type === InstrumentType.DrumMachine;
    }

    /*
     *
     *  Drum Machine
     *
     */
    get drumMachineKeys(): DrumMachineNotesGrid[] {
        const loop = this.loop<DrumMachineNotes>();
        const data = loop.data as DrumMachineLoopData;

        const { resolution } = data;
        const beatTimes = divideBeatRange(new BeatRange(new Beat(0), loop.duration), resolution);

        return Object.keys(DrumMachineNotes).map((drumKeyId: DrumMachineNotes) => {
            const notesForKey = this.loop<DrumMachineNotes>().notes.get(drumKeyId, ImmutableMap()).toList().toArray() as MidiNote[];
            return {
                id: drumKeyId,
                title: 'Sample',
                notes: beatTimes.map((beat, index) => {
                    let classNames = ['sample'];
                    const noteIsOn = notesForKey.find((note) => {
                        return note.range.start.index === beat.index;
                    }) !== undefined;

                    if (noteIsOn) {
                        classNames.push('switch--selected');
                    }

                    return {
                        className: classNames.join(' '),
                        id: index + ''
                    }
                })
            }
        })
    }

    get drumMachineSampleLabels(): string[] {
        const loop = this.loop<DrumMachineNotes>();
        const data = loop.data as DrumMachineLoopData;
        const { resolution } = data;

        return divideBeatRange(new BeatRange(new Beat(0), loop.duration), resolution).map((beat, index) => {
            return `${index} / 4`;
        });
    }

    onBeatClick(evt: MouseEvent) {
        const loop = this.loop<DrumMachineNotes>();
        const data = loop.data as DrumMachineLoopData;
        const { resolution } = data;

        const target = evt.target as HTMLElement;
        const keyId = target.getAttribute('data-key-id');
        const beatIndex = parseInt(target.getAttribute('data-beat-index') as string, 10);
        const range = new BeatRange(new Beat(beatIndex * resolution.index), resolution);

        appStore.dispatch(
            createLoopNote(this.loopId, generateId(), keyId, range),
        );
    }

    /*
     *
     *  Piano
     *
     */
    get hasPiano(): boolean {
        return !!this.pianoId;
    }

    get canClosePianoGrid() {
        return true;
    }

    get pianoMidiNotes(): PianoMidiNoteMap {
        const { loop } = this;
        if (!loop) {
            return {};
        }

        const obj: PianoMidiNoteMap = loop.notes.reduce((seed: {[key: string]: MidiNote[]}, note: MidiNote) => {
            if (seed[note.note] === undefined) {
                seed[note.note] = [];
            }
            seed[note.note].push(note);
            return seed;
        }, {});
        return obj;
    }

    /*
     *
     *  Lifecycle
     *
     */
    connectedCallback() {
        if (!this.loopId) {
            return;
        }
        const pianoId = generateId();
        appStore.dispatch(
            createPiano(pianoId, this.loopId)
        );
        this.pianoId = pianoId;
    }
}
