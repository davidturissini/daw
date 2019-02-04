import { LightningElement, api, wire, track } from 'lwc';
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
import { generateId } from 'util/uniqueid';
import { AudioRangeCreatedEvent, AudioRangeChangeEvent, GridCloseEvent } from 'cmp/grid/events';
import { addNote, setNoteRange } from 'store/audiosegment/action';
import { navigate } from 'store/route/action';
import { RouteNames } from 'store/route';

export default class SegmentEdit extends LightningElement {
    bsm: BehaviorStateMachine<BaseState> = new BehaviorStateMachine(new IdleState());
    @api segmentId: string;
    @track pianoId: string | null = null;

    @wire(wireSymbol, {
        paths: {
            segments: ['audiosegment', 'items'],
            tracks: ['audiotrack', 'items'],
            instruments: ['instrument', 'items'],
        },
    })
    storeData: {
        data: {
            segments: AudioSegmentState['items'];
            tracks: AudioTrackState['items'];
            instruments: InstrumentState['items'];
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

    get pianoMidiNotes() {
        return this.segment.notes.map((notes) => {
            return notes.toList().toJS();
        }, []).toJS();
    }

    /*
     *
     *  Piano Events
     *
     */
    onPianoMouseDown(evt: PianoMouseDownEvent) {
        this.bsm.state.onPianoMouseDown(this.bsm, evt)
    }

    onPianoMouseEnter(evt: PianoMouseEnterEvent) {
        this.bsm.state.onPianoMouseEnter(this.bsm, evt)
    }

    onPianoMouseLeave(evt: PianoMouseLeaveEvent) {
        this.bsm.state.onPianoMouseLeave(this.bsm, evt)
    }

    onPianoGridClose(evt: GridCloseEvent) {
        appStore.dispatch(
            navigate(RouteNames.Home, {})
        );
    }

    /*
     *
     *  Document Events
     *
     */
    onDocumentMouseUp = (evt) => {
        this.bsm.state.onDocumentMouseUp(this.bsm, evt);
    }

    /*
     *
     *  Audio Range Events
     *
     */
    onAudioRangeCreated(evt: AudioRangeCreatedEvent) {
        const { id, parentId: octave, range } = evt.detail;
        appStore.dispatch(
            addNote(this.segment.id, octave, id, range)
        );
    }

    onAudioRangeChange(evt: AudioRangeChangeEvent) {
        const { id: noteId, parentId: octave, range } = evt.detail;
        appStore.dispatch(
            setNoteRange(this.segment.id, octave, noteId, range)
        );
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
