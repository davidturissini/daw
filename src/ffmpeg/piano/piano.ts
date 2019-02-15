import { LightningElement, api, track } from 'lwc';
import { MidiNote, PianoKey, notes } from 'util/sound';
import { TickRange, Tick, SIXTEENTH_BEAT, EIGHTH_BEAT, QUARTER_BEAT, HALF_BEAT, ONE_BEAT, tick } from 'store/tick';
import { NoteVariant } from 'notes/index';
import { MidiNoteViewData } from 'notes/midinote';
import { TimelineDragEvent } from 'event/timelinedrag';
import { Tempo } from 'store/project';
import { Marker, MarkerVariant, MarkerCursorData } from 'markers/index';
import { Color } from 'util/color';
import { KeyboardNoteViewModel, KeyboardKeyViewModel } from 'cmp/keyboard/keyboard';
import { PianoKeyboard } from 'keyboard/index';
import { ButtonGroupButton, ButtonGroupValueChangeEvent } from 'cmp/buttongroup/buttongroup';


export type PianoMidiNoteMap = {
    [octave: string]: MidiNote[]
};

export default class PianoElement extends LightningElement {
    @api range: TickRange;
    @api notes: MidiNote[];
    @api currentTime: Tick | null = null;
    @track visibleRange: TickRange;
    @api tempo: Tempo;
    @track quanitizeIntervalIndex: number = QUARTER_BEAT.index;

    get gridRows(): KeyboardKeyViewModel<PianoKey, PianoKeyboard>[] {
        return Object.keys(PianoKey).map((pianoKey: PianoKey) => {
            const note = notes[PianoKey[pianoKey]];
            const vm: KeyboardKeyViewModel<PianoKey, PianoKeyboard> = {
                id: pianoKey,
                pianoKey,
                note,
                data: {},
                frame: {
                    width: 150,
                    height: 20
                }
            };

            return vm;
        });
    }

    get loopRanges(): KeyboardNoteViewModel<MidiNoteViewData>[] {
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

    get quanitizeIntervalButtons(): ButtonGroupButton<number>[] {
        return [{
            value: SIXTEENTH_BEAT.index,
            text: '1/16',
            key: '1/16',
        },{
            value: EIGHTH_BEAT.index,
            text: '1/8',
            key: '1/8',
        },{
            value: QUARTER_BEAT.index,
            text: '1/4',
            key: '1/4',
        },{
            value: HALF_BEAT.index,
            text: '1/2',
            key: '1/2',
        },{
            value: ONE_BEAT.index,
            text: '1/1',
            key: '1/1',
        }]
    }

    get quanitizeResolution(): Tick {
        return tick(this.quanitizeIntervalIndex);
    }

    /*
     *
     * Events
     *
    */
    onTimelineDrag(evt: TimelineDragEvent) {
        this.visibleRange = evt.detail.range
    }

    onQuanitizeIntervalChange(evt: ButtonGroupValueChangeEvent<number>) {
        const { value } = evt.detail;
        this.quanitizeIntervalIndex = value;
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
