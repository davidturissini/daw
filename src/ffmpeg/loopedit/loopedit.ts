import { LightningElement, wire, api } from 'lwc';
import { appStore, wireSymbol } from 'store/index';
import { MidiNote, PianoKey, notes, PianoKeyMap } from 'util/sound';
import { ProjectState } from 'store/project/reducer';
import { Instrument, InstrumentData } from 'store/instrument';
import { InstrumentState } from 'store/instrument/reducer';
import { InstrumentType } from 'store/instrument/types';
import { Loop } from 'store/loop';
import { LoopState } from 'store/loop/reducer';
import { createLoopNote, setLoopNoteRange, deleteLoopNote, setLoopRange } from 'store/loop/action';
import { Map as ImmutableMap } from 'immutable';
import { MidiNoteDeletedEvent } from 'event/midinotedeletedevent';
import { LoopRangeChangeEvent } from 'event/looprangechangeevent';
import { MidiNoteCreatedEvent } from 'event/midinotecreatedevent';
import { MidiNoteRangeChangedEvent } from 'event/midinoterangechangedevent';


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

    instrument<T extends InstrumentData>(): Instrument<T> {
        return this.storeData.data.instruments.get(this.loop.instrumentId) as Instrument<T>;
    }

    get instrumentIsDrumMachine() {
        return this.instrument().type === InstrumentType.DrumMachine;
    }

    get shouldRenderPiano() {
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
            [PianoKey.Csharp3]: notes[PianoKey.Csharp3],
            [PianoKey.D3]: notes[PianoKey.D3],
            [PianoKey.Dsharp3]: notes[PianoKey.Dsharp3],
            [PianoKey.E3]: notes[PianoKey.E3],
            [PianoKey.F3]: notes[PianoKey.F3],
            [PianoKey.Fsharp3]: notes[PianoKey.Fsharp3],
            [PianoKey.G3]: notes[PianoKey.G3]
        }
    }

    onMidiNoteCreated(evt: MidiNoteCreatedEvent) {
        const { key, noteId, quanitizedRange } = evt.detail;
        appStore.dispatch(
            createLoopNote(this.loopId, noteId, key, quanitizedRange),
        );
    }

    onMidiNoteRangeChanged(evt: MidiNoteRangeChangedEvent) {
        const { key, noteId, quanitizedRange } = evt.detail;
        appStore.dispatch(
            setLoopNoteRange(this.loopId, key, noteId, quanitizedRange),
        );
    }

    onMidiNoteDeleted(evt: MidiNoteDeletedEvent) {
        const { id, key } = evt.detail;
        appStore.dispatch(
            deleteLoopNote(this.loopId, id, key)
        );
    }

    onLoopRangeChange(evt: LoopRangeChangeEvent) {
        const { range } = evt.detail;
        appStore.dispatch(
            setLoopRange(this.loopId, range),
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

    get midiNotes(): MidiNote[] {
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

    get pianoNotes() {
        return notes;
    }

    get pianoInstrumentId() {
        return this.instrument<any>().id;
    }

    get instrumentId() {
        return this.instrument<any>().id;
    }

    get projectTempo() {
        return this.storeData.data.project.currentProject!.tempo;
    }
}
