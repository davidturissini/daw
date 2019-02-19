import { LightningElement, api, track } from 'lwc';
import { MidiNote, PianoKey, notes } from 'util/sound';
import { TickRange, Tick, SIXTEENTH_BEAT, EIGHTH_BEAT, QUARTER_BEAT, HALF_BEAT, ONE_BEAT, tick, THIRD_BEAT, tickRange, tickSubtract } from 'store/tick';
import { NoteVariant } from 'notes/index';
import { MidiNoteViewData } from 'notes/midinote';
import { TimelineDragEvent } from 'event/timelinedrag';
import { Tempo } from 'store/project';
import { Marker, MarkerVariant, MarkerCursorData, MarkerCaretData, MarkerCaretAlign } from 'markers/index';
import { Color } from 'util/color';
import { KeyboardNoteViewModel, KeyboardKeyViewModel } from 'cmp/keyboard/keyboard';
import { PianoKeyboard } from 'keyboard/index';
import { ButtonGroupButton, ButtonGroupValueChangeEvent } from 'cmp/buttongroup/buttongroup';
import { MarkerTickChangedEvent } from 'event/markertickchanged';
import { KeyboardRangeChangeEvent, keyboardRangeChangeEvent } from 'event/keyboardrangechange';
import { AudioWindowMouseEnterEvent } from 'event/audiowindowmouseenterevent';
import { AudioWindowMouseMoveEvent } from 'event/audiowindowmousemoveevent';
import { AudioWindowMouseLeaveEvent } from 'event/audiowindowmouseleaveevent';


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
    @track userPosition: Tick | null = null;
    @api instrumentId: string;

    get gridRows(): KeyboardKeyViewModel<PianoKey, PianoKeyboard>[] {
        return Object.keys(PianoKey).map((key: PianoKey) => {
            const pianoKey = PianoKey[key];
            const note = notes[pianoKey];
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
                rowId: note.pianoKey,
                data: {
                    noteId: note.id,
                    key: note.pianoKey,
                },
                variant: NoteVariant.MidiNote
            };
        });
    }

    get timelineMarkers(): Marker<MarkerCaretData>[] {
        return [{
            tick: this.range.duration,
            key: 'duration',
            variant: MarkerVariant.Caret,
            data: {
                markerId: 'duration',
                align: MarkerCaretAlign.RIGHT,
                color: new Color(255, 255, 255),
            },
        }];
    }

    get audioWindowMarkers(): Marker<MarkerCursorData>[] {
        const { currentTime, userPosition } = this;
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

        if (userPosition) {
            markers.push({
                tick: userPosition,
                key: 'userPosition',
                variant: MarkerVariant.Cursor,
                data: {
                    color: new Color(255, 255, 255),
                    dashed: true,
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
            value: THIRD_BEAT.index,
            text: '1/3',
            key: '1/3',
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

    onTimelineMarkerTickChanged(evt: MarkerTickChangedEvent) {
        const { markerId, quanitized } = evt.detail;
        if (markerId === 'duration') {
            const range = tickRange(this.range.start, tickSubtract(quanitized, this.range.start));
            const event: KeyboardRangeChangeEvent = keyboardRangeChangeEvent(range);
            this.dispatchEvent(event);
        }
    }

    onKeyboardMouseEnter(evt: AudioWindowMouseEnterEvent) {
        const { quanitized } = evt.detail;
        this.userPosition = quanitized;
    }

    onKeyboardMouseMove(evt: AudioWindowMouseMoveEvent) {
        const { quanitized } = evt.detail;
        this.userPosition = quanitized;
    }

    onKeyboardMouseLeave(evt: AudioWindowMouseLeaveEvent) {
        this.userPosition = null;
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
