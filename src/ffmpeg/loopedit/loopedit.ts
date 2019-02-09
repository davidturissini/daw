import { LightningElement, wire, api } from 'lwc';
import { appStore, wireSymbol } from 'store/index';
import { MidiNote, PianoKey, notes, getAudioContext, PianoKeyMap } from 'util/sound';
import { AudioRange } from 'util/audiorange';
import { timeZero, beatToTime, timeToBeat, Time } from 'util/time';
import { ProjectState } from 'store/project/reducer';
import { Instrument, InstrumentData } from 'store/instrument';
import { InstrumentState } from 'store/instrument/reducer';
import { InstrumentType } from 'store/instrument/types';
import { Loop } from 'store/loop';
import { LoopState } from 'store/loop/reducer';
import { createLoopNote, setLoopNoteRange, setLoopDuration } from 'store/loop/action';
import { Map as ImmutableMap } from 'immutable';
import { AudioRangeCreatedEvent, AudioRangeChangeEvent, GridRangeChangeEvent } from 'cmp/grid/events';


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
    drumMachineKeys(): PianoKeyMap {
        return {
            [PianoKey.C3]: notes[PianoKey.C3],
            [PianoKey.Csharp3]: notes[PianoKey.Csharp3]
        }
    }

    onDrumMachineNoteCreated(evt: AudioRangeCreatedEvent) {
        const { id, rowIndex, beatRange } = evt.detail;
        const keys = Object.keys(this.drumMachineKeys());
        const key = keys[rowIndex];
        beatRange.duration = { index: 1/4 }
        appStore.dispatch(
            createLoopNote(this.loopId, id, key as PianoKey, beatRange),
        );
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
