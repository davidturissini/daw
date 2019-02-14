import { LightningElement, api, track } from 'lwc';
import { MidiNote, PianoKey, notes } from 'util/sound';
import { TickRange, Tick } from 'store/tick';
import { AudioWindowGridRow, AudioWindowGridTickRange } from 'cmp/audiowindowgrid/audiowindowgrid';
import { PianoKeyboard } from 'keyboard/index';
import { NoteVariant } from 'notes/index';
import { MidiNoteViewData } from 'notes/midinote';
import { TimelineDragEvent } from 'event/timelinedrag';
import { Tempo } from 'store/project';
import { Marker, MarkerVariant, MarkerCursorData } from 'markers/index';
import { Color } from 'util/color';

export type PianoMidiNoteMap = {
    [octave: string]: MidiNote[]
};

export default class PianoElement extends LightningElement {
    @api range: TickRange;
    @api notes: MidiNote[];
    @api currentTime: Tick | null = null;
    @track visibleRange: TickRange;
    @api tempo: Tempo;

    get gridRows(): AudioWindowGridRow<PianoKey, PianoKeyboard>[] {
        return Object.keys(PianoKey).map((pianoKey: PianoKey) => {
            const note = notes[PianoKey[pianoKey]];
            const vm: AudioWindowGridRow<PianoKey, PianoKeyboard> = {
                id: pianoKey,
                data: {
                    pianoKey,
                    note,
                },
                frame: {
                    width: 150,
                    height: 20
                }
            };

            return vm;
        });
    }

    get loopRanges(): AudioWindowGridTickRange<MidiNoteViewData>[] {
        return this.notes.map((note) => {
            return {
                range: note.range,
                rowId: note.note,
                data: {
                    noteId: note.id,
                    key: PianoKey[note.note],
                },
                variant: NoteVariant.MidiNote
            };
        });
    }

    get audioWindowMarkers(): Marker<MarkerCursorData>[] {
        const { currentTime } = this;
        const markers = [{
            tick: this.range.duration,
            key: 'duration',
            variant: MarkerVariant.Cursor,
            data: {
                color: new Color(255, 255, 255),
                dashed: false,
            }
        }];

        if (currentTime) {
            markers.push({
                tick: currentTime,
                key: 'currentTime',
                variant: MarkerVariant.Cursor,
                data: {
                    color: new Color(255, 255, 255),
                    dashed: false,
                }
            })
        }


        return markers;
    }

    /*
     *
     * Events
     *
    */
    onTimelineDrag(evt: TimelineDragEvent) {
        this.visibleRange = evt.detail.range
    }

    /*
     *
     * Lifecycle
     *
    */
    connectedCallback() {
        this.visibleRange = {
            start: this.range.start,
            duration: this.range.duration,
        }
    }
}
