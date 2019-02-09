import { LightningElement, api, wire, track } from 'lwc';
import { MidiNote, PianoKeyMap, PianoKey } from 'util/sound';
import { wireSymbol } from 'store/index';
import { AudioRange } from 'util/audiorange';
import { Tempo } from 'store/project';
import { Instrument } from 'store/instrument';
import { InstrumentState } from 'store/instrument/reducer';
import { PianoStateMachine } from './states';
import { PianoStateInputNames } from './states/types';

export type PianoMidiNoteMap = {
    [octave: string]: MidiNote[]
};

export default class PianoElement extends LightningElement {
    @api midiNotes: MidiNote[];
    @api canCloseGrid: boolean = false;
    @api range: AudioRange | null = null;
    @api instrumentId: string;
    @api audioContext: BaseAudioContext;
    @api tempo: Tempo;
    @api pianoKeys: PianoKeyMap;
    @track gridWindowId: string | null = null;
    @wire(wireSymbol, {
        paths: {
            instruments: ['instrument', 'items'],
        }
    })
    storeData: {
        data: {
            instruments: InstrumentState['items'];
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

    get pianoKeyViewModels() {
        const { pianoKeys } = this;
        return Object.keys(pianoKeys).map((key: PianoKey) => {
            const note = pianoKeys[key]!;
            const classNames = ['key'];
            if (note.sharp === true) {
                classNames.push('key--sharp');
            }

            return {
                note: key,
                name: key,
                className: classNames.join(' '),
            };
        })
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
