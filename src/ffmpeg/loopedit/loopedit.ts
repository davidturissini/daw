import { wire, api, LightningElement } from 'lwc';
import { appStore, wireSymbol } from 'store/index';
import { MidiNote, PianoKey, notes, PianoKeyMap } from 'util/sound';
import { Instrument, InstrumentData } from 'store/instrument';
import { InstrumentState } from 'store/instrument/reducer';
import { InstrumentType } from 'store/instrument/types';
import { Loop } from 'store/loop';
import { LoopState } from 'store/loop/reducer';
import { createLoopNote, setLoopNoteRange, deleteLoopNote, setLoopRange, setLoopNoteKey } from 'store/loop/action';
import { Map as ImmutableMap } from 'immutable';
import { MidiNoteDeletedEvent } from 'event/midinotedeletedevent';
import { KeyboardRangeChangeEvent } from 'event/keyboardrangechange';
import { MidiNoteCreatedEvent } from 'event/midinotecreatedevent';
import { MidiNoteRangeChangedEvent } from 'event/midinoterangechangedevent';
import { Tempo } from 'store/project';
import { MidiNoteKeyChangedEvent } from 'event/midinotekeychangedevent';


export default class LoopEditElement extends LightningElement {
    @api loopId: string;
    @api tempo: Tempo;

    @wire(wireSymbol, {
        paths: {
            instruments: ['instrument', 'items'],
            loop: ['loop', 'items']
        }
    })
    storeData: {
        data: {
            loop: LoopState['items'];
            instruments: InstrumentState['items'];
        },
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
        return !this.instrumentIsDrumMachine;
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
        const { key, noteId, range } = evt.detail;
        appStore.dispatch(
            createLoopNote(this.loopId, noteId, key, range),
        );
    }

    onMidiNoteRangeChanged(evt: MidiNoteRangeChangedEvent) {
        const { noteId, quanitizedRange } = evt.detail;
        appStore.dispatch(
            setLoopNoteRange(this.loopId, noteId, quanitizedRange),
        );
    }

    onMidiNoteDeleted(evt: MidiNoteDeletedEvent) {
        const { id } = evt.detail;
        appStore.dispatch(
            deleteLoopNote(this.loopId, id)
        );
    }

    onKeyboardRangeChange(evt: KeyboardRangeChangeEvent) {
        const { range } = evt.detail;
        appStore.dispatch(
            setLoopRange(this.loopId, range),
        );
    }

    onMidiNoteKeyChanged(evt: MidiNoteKeyChangedEvent) {
        const { noteId, key } = evt.detail;
        appStore.dispatch(
            setLoopNoteKey(this.loopId, noteId, key)
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

        return loop.notes.toList().toArray();
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
}
