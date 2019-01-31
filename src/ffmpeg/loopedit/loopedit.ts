import { LightningElement, track, wire, api } from 'lwc';
import { generateId } from 'util/uniqueid';
import { appStore, wireSymbol } from 'store/index';
import { createPiano } from 'store/piano/action';
import { PianoMidiNoteMap } from 'cmp/piano/piano';
import { MidiNote } from 'util/sound';
import { AudioRange } from 'util/audiorange';
import { timeZero, beatToTime } from 'util/time';
import { ProjectState } from 'store/project/reducer';
import { Instrument } from 'store/instrument';
import { InstrumentState } from 'store/instrument/reducer';
import { InstrumentType } from 'store/instrument/types';
import { DrumMachineData } from 'store/instrument/types/DrumMachine';
import { setDrumMachineSwitchOnOff } from 'store/instrument/action';
import { Loop } from 'store/loop';
import { LoopState } from 'store/loop/reducer';

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

    get loop(): Loop {
        const { loopId } = this;
        return this.storeData.data.loop.get(loopId) as Loop;
    }

    get loopRange(): AudioRange | null {
        const { loop } = this;
        return new AudioRange(timeZero, beatToTime(loop.duration, this.project.tempo));
    }

    instrument<T>(): Instrument<T> {
        const { loop } = this;
        return this.storeData.data.instruments.get(loop.instrumentId) as Instrument<T>;
    }

    get instrumentIsDrumMachine() {
        return this.instrument().type === InstrumentType.DrumMachine;
    }

    /*
     *
     *  Drum Machine
     *
     */
    get drumMachineSamples() {
        const { data } = this.instrument<DrumMachineData>();
        return data.samples.map((sample, index) => {
            return {
                id: index,
                title: sample.sample === null ? null : 'Sample',
                ...sample,
                switches: sample.switches.map((swtch, switchIndex) => {
                    return {
                        ...swtch,
                        className: swtch.onOff ? 'switch--selected switch' : 'switch',
                        id: switchIndex,
                    }
                })
            };
        });
    }

    get drumMachineSampleLabels(): string[] {
        const { data } = this.instrument<DrumMachineData>();
        const { duration, resolution } = data;
        const labels: string[] = []
        const numberOfBeats = duration.index / resolution.index;

        for(let i = 0; i < numberOfBeats; i += 1) {
            labels.push(`${i} / 4`);
        }
        console.log(labels)
        return labels;
    }

    onBeatClick(evt: MouseEvent) {
        const target = evt.target as HTMLElement;
        const sampleId = parseInt(target.getAttribute('data-sample-id') as string, 10);
        const switchId = parseInt(target.getAttribute('data-beat-id') as string, 10);

        appStore.dispatch(
            setDrumMachineSwitchOnOff(this.instrument<any>().id, switchId, sampleId, true),
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
