import { LightningElement, track, api } from 'lwc';
import { Rect, Frame } from 'util/geometry';
import { AudioRange, BeatRange } from 'util/audiorange';
import { Color } from 'util/color';
import { TickRange, Tick, QUARTER_BEAT, tickRange, tickZero, quanitize, SIXTEENTH_BEAT } from 'store/tick';
import { AudioWindowTickRange } from 'cmp/audiowindow/audiowindow';
import { NoteViewData, NoteVariant } from 'notes/index';
import { AudioWindowDragEvent } from 'event/audiowindowdragevent';
import { AudioWindowDragStartEvent } from 'event/audiowindowdragstartevent';
import { generateId } from 'util/uniqueid';
import { Tempo } from 'store/project';
import { Marker } from 'markers/index';
import { MidiNoteCreatedEvent, midiNoteCreatedEvent } from 'event/midinotecreatedevent';
import { MidiNoteRangeChangedEvent, midiNoteRangeChangedEvent } from 'event/midinoterangechangedevent';
import { PianoKey, Note } from 'util/sound';


export enum KeyboardVariant {
    Piano, DrumMachine
}

export interface GridRange {
    itemId: string;
    range: AudioRange | BeatRange;
    color: Color;
}

export interface GridRowRectMap {
    [key: string]: {
        index: number;
        rect: Rect;
    }
}

export interface KeyboardKeyViewModel<K extends string, T> {
    id: K;
    data: T;
    pianoKey: PianoKey;
    note: Note;
    frame: Frame;
}

export interface KeyboardNoteViewModel<T> {
    range: TickRange;
    rowId: string;
    variant: NoteVariant;
    data: T;
}

interface AudioWindowGridRowViewModel<T> extends KeyboardKeyViewModel<any, T> {
    style: string;
}

export default class GridElement<K extends string, T extends NoteViewData> extends LightningElement {
    @api notes: KeyboardNoteViewModel<any>[];
    @api keys: KeyboardKeyViewModel<K, T>[] = [];
    @api visibleRange: TickRange;
    @api notePadding: Frame = { height: 0, width: 0 };
    @api variant: KeyboardVariant = KeyboardVariant.Piano;
    @api canvas: boolean = false;
    @api tempo: Tempo;
    @api markers: Marker<any>[] = [];
    @track resolution: Tick = QUARTER_BEAT;
    @track rect: Rect | null = null;

     /*
     *
     * lifecycle
     *
     */
    connectedCallback() {
        requestAnimationFrame(() => {
            const rect = this.getBoundingClientRect();
            this.rect = {
                width: rect.width,
                height: rect.height,
                x: rect.left,
                y: rect.top,
            }
        });
    }

    /*
     *
     * variants
     *
     */
    get rowViewModels(): AudioWindowGridRowViewModel<any>[] {
        return this.keys.map((row) => {
            const rowFrame = this.rowsRectMap[row.id];
            const height = rowFrame.rect.height;
            return {
                id: row.id,
                data: row.data,
                pianoKey: row.pianoKey,
                frame: rowFrame.rect,
                note: row.note,
                style: `padding-top:${this.notePadding.height / 2}px; padding-bottom: ${this.notePadding.height / 2}px; width:${row.frame.width}; height:${height}px`
            }
        })
    }

    get rowsRectMap(): { [key: string]: { rowId: string, rect: Rect } } {
        const { notePadding } = this;
        let y = notePadding.height / 2;
        return this.keys.reduce((seed: { [key: string]: { rowId: string, rect: Rect } }, row) => {
            const height = row.frame.height + (notePadding.height / 2);
            const rect: Rect = {
                x: 0,
                y: y,
                height,
                width: 0,
            }
            seed[row.id as string] = {
                rowId: row.id,
                rect
            };

            y += height + notePadding.height;
            return seed;
        }, {});
    }

    findRowFromY(y: number): KeyboardKeyViewModel<K, T> | null {
        const { keys } = this;
        let rowY = 0;
        for(let i = 0; i < keys.length; i += 1) {
            rowY += keys[i].frame.height;
            if (rowY > y) {
                return keys[i];
            }
        }
        return null;
    }

    get tickRangesViewModels(): AudioWindowTickRange[] {
        return this.notes.map((gridTickRange) => {
            const { rowId, rect: rowRect } = this.rowsRectMap[gridTickRange.rowId];
            const vm: AudioWindowTickRange = {
                id: `${rowId}-${gridTickRange.range.start.index}`,
                range: gridTickRange.range,
                rect: rowRect,
                variant: gridTickRange.variant,
                data: gridTickRange.data,
            }
            return vm;
        })
    }

    get rowLanes(): Array<{ style: string, className: string, key: string }> {
        return this.rowViewModels.map((rowViewModel, index) => {
            const classNames = ['grid-lane'];
            if (index % 2 === 1) {
                classNames.push('grid-lane--odd');
            }
            return {
                key: rowViewModel.id,
                className: classNames.join(' '),
                style: rowViewModel.style,
            }
        });
    }

    mainScrollY: number = 0;
    onMainScroll(evt) {
        this.mainScrollY = evt.target.scrollTop;
    }

    audioWindowDrag: {
        rangeId: string;
        range: TickRange;
    } | null = null;
    onAudioWindowDragStart(evt: AudioWindowDragStartEvent) {
        evt.stopPropagation();
        const { origin, tick, } = evt.detail;
        const row = this.findRowFromY(origin.y + this.mainScrollY);
        if (!row) {
            return;
        }
        const rangeId = generateId();
        const quanitizedStart = quanitize(SIXTEENTH_BEAT, tick, this.tempo);
        const range = tickRange(quanitizedStart, tickZero);
        this.audioWindowDrag = {
            rangeId,
            range,
        }
        const event: MidiNoteCreatedEvent = midiNoteCreatedEvent(row.id as PianoKey, rangeId, range);
        this.dispatchEvent(event);
    }

    onAudioWindowDrag(evt: AudioWindowDragEvent) {
        evt.stopPropagation();
        const { audioWindowDrag } = this;
        if (audioWindowDrag === null) {
            return;
        }
        const { origin, delta } = evt.detail;
        const row = this.findRowFromY(origin.y + this.mainScrollY);
        if (!row) {
            return;
        }
        const { rangeId, range } = audioWindowDrag;
        const event: MidiNoteRangeChangedEvent = midiNoteRangeChangedEvent({
            key: row.id as PianoKey,
            noteId: rangeId,
            currentRange: range,
            startDelta: tickZero,
            durationDelta: delta,
            quanitizeResolution: SIXTEENTH_BEAT,
            tempo: this.tempo
        });
        audioWindowDrag.range = event.detail.range;
        this.dispatchEvent(event);
    }
}
