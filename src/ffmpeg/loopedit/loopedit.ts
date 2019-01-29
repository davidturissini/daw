import { LightningElement, track, wire } from 'lwc';
import { generateId } from 'util/uniqueid';
import { appStore, wireSymbol } from 'store/index';
import { createPiano } from 'store/piano/action';
import { RouterState } from 'store/route/reducer';
import { AudioTrackState } from 'store/audiotrack/reducer';
import { AudioRangeChangeEvent, AudioRangeCreatedEvent, GridRangeChangeEvent } from 'cmp/grid/events';
import { createTrackLoopNote, setTrackLoopNoteRange, setTrackLoopDuration } from 'store/audiotrack/action';
import { PianoMidiNoteMap } from 'cmp/piano/piano';
import { Loop } from 'store/audiotrack';
import { MidiNote } from 'util/sound';
import { AudioRange } from 'util/audiorange';
import { timeZero, timeToBeat, beatToTime } from 'util/time';
import { ProjectState } from 'store/project/reducer';

export default class LoopEditElement extends LightningElement {
    @track pianoId: string | null = null;

    @wire(wireSymbol, {
        paths: {
            route: ['router', 'route'],
            audiotracks: ['audiotrack', 'items'],
            project: ['project']
        }
    })
    storeData: {
        data: {
            route: RouterState['route'],
            audiotracks: AudioTrackState['items'],
            project: ProjectState;
        },
    }

    get project() {
        return this.storeData.data.project;
    }

    get loop(): Loop | null {
        const { route } = this.storeData.data;
        if (!route) {
            return null;
        }
        const { track_id, loop_id } = route.params;
        return this.storeData.data.audiotracks.getIn([track_id, 'loops', loop_id]);
    }

    get loopRange(): AudioRange | null {
        const { loop } = this;
        if (!loop) {
            return null;
        }

        return new AudioRange(timeZero, beatToTime(loop.duration, this.project.tempo));
    }

    get trackId() {
        const { route } = this.storeData.data;
        if (route) {
            return route.params.track_id;
        }
        return null;
    }

    get loopId() {
        const { route } = this.storeData.data;
        if (route) {
            return route.params.loop_id;
        }
        return null;
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
     *  Piano Events
     *
     */
    onPianoGridRangeChange(evt: GridRangeChangeEvent) {
        const { trackId, loop } = this;
        if (!trackId || !loop) {
            return;
        }

        const { duration } = evt.detail.range;

        appStore.dispatch(
            setTrackLoopDuration(trackId, loop.id, timeToBeat(duration, this.project.tempo))
        );
    }

    /*
     *
     *  Events
     *
     */
    onAudioRangeChange(evt: AudioRangeChangeEvent) {
        const { trackId } = this;
        if (!trackId) {
            return;
        }
        const { id: noteId, range } = evt.detail;
        appStore.dispatch(
            setTrackLoopNoteRange(trackId, this.loopId, noteId, range)
        )
    }

    onAudioRangeCreated(evt: AudioRangeCreatedEvent) {
        const { trackId } = this;
        if (!trackId) {
            return;
        }
        const { parentId: octave, id: noteId, range } = evt.detail;
        appStore.dispatch(
            createTrackLoopNote(trackId, octave, this.loopId, noteId, range),
        )
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
