import { LightningElement, wire, api } from 'lwc';
import { appStore, wireSymbol } from 'store/index';
import { MidiNote, PianoKey, notes, getAudioContext, PianoKeyMap } from 'util/sound';
import { timeToBeat, Time } from 'util/time';
import { ProjectState } from 'store/project/reducer';
import { Instrument, InstrumentData } from 'store/instrument';
import { InstrumentState } from 'store/instrument/reducer';
import { InstrumentType } from 'store/instrument/types';
import { Loop } from 'store/loop';
import { LoopState } from 'store/loop/reducer';
import { createLoopNote, setLoopNoteRange, deleteLoopNote, setLoopRange } from 'store/loop/action';
import { Map as ImmutableMap } from 'immutable';
import { GridRangeChangeEvent, AudioRangeChangeEvent } from 'cmp/grid/events';
import { DrumMachineData } from 'store/instrument/nodes/DrumMachine';
import { EnvelopeValueChangeEvent } from 'cmp/envelopefield/envelopefield';
import { setInstrumentData } from 'store/instrument/action';
import { TickRangeCreatedEvent } from 'event/tickrangecreatedevent';
import { TickRangeDeletedEvent } from 'event/tickrangedeletedevent';
import { AudioRangeCreatedEvent } from 'cmp/audiowindowgrid/events';
import { LoopRangeChangeEvent } from 'event/looprangechangeevent';


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

    onDrumMachineNoteCreated(evt: TickRangeCreatedEvent<PianoKey>) {
        const { range, parentId, id } = evt.detail;
        appStore.dispatch(
            createLoopNote(this.loopId, id, parentId, range),
        );
    }

    onDrumMachineNoteDeleted(evt: TickRangeDeletedEvent<PianoKey>) {
        const { id, parentId } = evt.detail;
        appStore.dispatch(
            deleteLoopNote(this.loopId, id, parentId)
        );
    }

    get drumMachineEnvelopeFields() {
        return ['attack', 'release'];
    }

    get drumMachineAttack() {
        return this.instrument<DrumMachineData>().data.attack;
    }

    get drumMachineRelease() {
        return this.instrument<DrumMachineData>().data.release;
    }

    onDrumMachineEnvelopeValueChange(evt: EnvelopeValueChangeEvent) {
        const instrument = this.instrument<DrumMachineData>();
        const type = evt.detail.type as 'attack' | 'release';
        const data = instrument.data.set(type, evt.detail.value);
        appStore.dispatch(
            setInstrumentData(instrument.id, data),
        )
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

    get instrumentId() {
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
