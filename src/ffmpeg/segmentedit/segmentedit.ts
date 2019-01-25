import { LightningElement, api, wire, track } from 'lwc';
import { PianoMouseDownEvent, PianoMouseEnterEvent, PianoMouseLeaveEvent } from './../piano/piano';
import { appStore, wireSymbol } from 'store/index';
import { AudioSegmentState } from 'store/audiosegment/reducer';
import { AudioSegment } from 'store/audiosegment';
import { AudioTrackState } from 'store/audiotrack/reducer';
import { AudioTrack } from 'store/audiotrack';
import { InstrumentState } from 'store/instrument/reducer';
import { Instrument } from 'store/instrument';
import { BehaviorStateMachine } from 'util/bsm';
import { BaseState } from './bsm/base';
import { IdleState } from './bsm/idle';
import { createPiano } from 'store/piano/action';
import { generateId } from 'util/uniqueid';
import { AudioSourceState } from 'store/audiosource/reducer';
import { AudioSource } from 'store/audiosource';
import { notes } from 'util/sound';
import { Color } from 'util/color';
import { EditorState } from 'store/editor/reducer';

const { keys } = Object;

export default class SegmentEdit extends LightningElement {
    bsm: BehaviorStateMachine<BaseState> = new BehaviorStateMachine(new IdleState());
    @api segmentId: string;
    @track pianoId: string | null = null;

    @wire(wireSymbol, {
        paths: {
            segments: ['audiosegment', 'items'],
            tracks: ['audiotrack', 'items'],
            instruments: ['instrument', 'items'],
            sources: ['audiosource', 'items'],
            editor: ['editor'],
        },
    })
    storeData: {
        data: {
            editor: EditorState;
            segments: AudioSegmentState['items'];
            tracks: AudioTrackState['items'];
            instruments: InstrumentState['items'];
            sources: AudioSourceState['items'];
        }
    }

    get segment(): AudioSegment {
        return this.storeData.data.segments.get(this.segmentId) as AudioSegment;
    }

    get track(): AudioTrack {
        return this.storeData.data.tracks.get(this.segment.trackId) as AudioTrack;
    }

    get instrument(): Instrument {
        return this.storeData.data.instruments.get(this.track.instrumentId) as Instrument;
    }

    get source(): AudioSource {
        return this.storeData.data.sources.get(this.segment.sourceId) as AudioSource;
    }

    get hasPiano(): boolean {
        return !!this.pianoId;
    }

    onPianoMouseDown(evt: PianoMouseDownEvent) {
        this.bsm.state.onPianoMouseDown(this.bsm, evt)
    }

    onPianoMouseEnter(evt: PianoMouseEnterEvent) {
        this.bsm.state.onPianoMouseEnter(this.bsm, evt)
    }

    onPianoMouseLeave(evt: PianoMouseLeaveEvent) {
        this.bsm.state.onPianoMouseLeave(this.bsm, evt)
    }

    onDocumentMouseUp = (evt) => {
        this.bsm.state.onDocumentMouseUp(this.bsm, evt);
    }

    /*
     *
     *  Template
     *
     */
    get pianoNotes() {
        return keys(notes).map((key) => {
            const note = notes[key];
            return {
                name: key,
                frequency: note.frequency,
                sharp: note.sharp,
                height: note.sharp ? 30 : 60,
            };
        });
    }
    get octaveNotes() {
        const obj = Object.keys(notes).reduce((seed, key) => {
            const note = notes[key];
            seed[key] = {
                octave: key,
                notes: [],
                height: note.sharp ? 30 : 60,
            };
            return seed;
        }, {});

        const grouped = this.source.notes.reduce((seed, note, index) => {
            seed[note.octave].notes.push({
                key: index,
                range: note.range,
                color: new Color(0, 255, 0),
            })
            return seed;
        }, obj);
        return Object.values(grouped);
    }

    get audioWindow() {
        return this.storeData.data.editor;
    }

    /*
     *
     *  Lifecycle
     *
     */
    connectedCallback() {
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        const pianoId = generateId();
        appStore.dispatch(
            createPiano(pianoId, this.track.id)
        );
        this.pianoId = pianoId;
    }

    disconnectedCallback() {
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
    }
}
