import { LightningElement, api, wire, track } from 'lwc';
import { notes, MidiNote, PianoKey } from 'util/sound';
import { wireSymbol, appStore } from 'store/index';
import { GridElementRow } from 'cmp/grid/grid';
import { AudioWindowState } from 'store/audiowindow/reducer';
import { Color } from 'util/color';
import { AudioRange } from 'util/audiorange';
import { stopPianoKey } from 'store/player/action';
import { Tempo } from 'store/project';
import { Instrument } from 'store/instrument';
import { InstrumentState } from 'store/instrument/reducer';
import { PianoStateMachine } from './states';
import { PianoStateInputNames } from './states/types';

export type PianoMidiNoteMap = {
    [octave: string]: MidiNote[]
};

const gridRowNoteMap: { [key: string]: { height: number } } = Object.keys(notes).reduce((seed, octave) => {
    const note = notes[octave];
    const row = {
        height: note.sharp ? 30 : 45,
    };
    seed[octave] = row;
    return seed;
}, {});

export default class PianoElement extends LightningElement {
    @api midiNotes: PianoMidiNoteMap;
    @api canCloseGrid: boolean = false;
    @api range: AudioRange | null = null;
    @api instrumentId: string;
    @api audioContext: BaseAudioContext;
    @api tempo: Tempo;
    @track gridWindowId: string | null = null;
    @wire(wireSymbol, {
        paths: {
            instruments: ['instrument', 'items'],
            audiowindow: ['audiowindow', 'items'],
        }
    })
    storeData: {
        data: {
            instruments: InstrumentState['items'];
            audiowindow: AudioWindowState['items'];
        }
    }

    fsm: PianoStateMachine<PianoElement>;

    constructor() {
        super();
        this.fsm = new PianoStateMachine(this);
    }

    get instrument(): Instrument<any> {
        return this.storeData.data.instruments.get(this.instrumentId) as Instrument<any>;
    }

    get gridRows(): GridElementRow[] {
        return Object.keys(notes).map((octave) => {
            const note = notes[octave];
            const midiNotes = this.midiNotes[octave] || [];
            const row: GridElementRow = {
                height: note.sharp ? 30 : 45,
                id: octave,
                ranges: midiNotes.map((midiNote) => {
                    return {
                        range: midiNote.range,
                        color: new Color(0, 255, 0),
                        itemId: midiNote.id,
                    };
                })
            };
            return row;
        }, {});
    }

    get pianoKeyViewModels() {
        return Object.keys(notes).map((key) => {
            const note = notes[key];
            const classNames = ['key'];
            const gridRow = gridRowNoteMap[key];
            const styles = [
                `height: ${gridRow.height}px`
            ];
            if (note.sharp === true) {
                classNames.push('key--sharp');
            }

            return {
                name: key,
                className: classNames.join(' '),
                style: styles.join(';')
            };
        })
    }

    get hasGridWindow() {
        return this.gridWindowId !== null;
    }

    get gridWindow() {
        const { gridWindowId } = this;
        if (gridWindowId) {
            return this.storeData.data.audiowindow.get(gridWindowId);
        }

        return null;
    }

    get noteViewModels() {
        return Object.keys(this.midiNotes).reduce((seed: any[], octave: string) => {
            const notes = this.midiNotes[octave];
            const midiNotes = notes.map((note) => {
                return {
                    octave,
                    color: new Color(0, 255, 0),
                    rowIndex: 12,
                    range: note.range,
                };
            });

            return seed.concat(midiNotes);
        }, []);
    }

    /*
     *
     *  Piano Key Events
     *
     */
    onKeyMouseLeave(evt: MouseEvent) {
        this.fsm.stateInput(PianoStateInputNames.PianoKeyMouseLeave, evt);
    }

    onKeyMouseEnter(evt: MouseEvent) {
        this.fsm.stateInput(PianoStateInputNames.PianoKeyMouseEnter, evt);
    }

    onKeyMouseDown(evt: MouseEvent) {
        this.fsm.stateInput(PianoStateInputNames.PianoKeyMouseDown, evt);
    }

    onDocumentMouseUp = (evt: MouseEvent) => {
        this.fsm.stateInput(PianoStateInputNames.DocumentMouseUp, evt);
    }

    /*
     *
     *  Lifecycle
     *
     */
    connectedCallback() {
        document.addEventListener('mouseup', this.onDocumentMouseUp);
    }

    disconnectedCallback() {
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
    }
}
