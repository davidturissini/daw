import { LightningElement, track, api } from 'lwc';
import { Rect, Frame } from 'util/geometry';
import { AudioRange, BeatRange } from 'util/audiorange';
import { Color } from 'util/color';
import { TickRange, Tick, QUARTER_BEAT, tickRange, tickZero, tickPlus } from 'store/tick';
import { AudioWindowTickRange } from 'cmp/audiowindow/audiowindow';
import { NoteViewData, NoteVariant } from 'notes/index';
import { KeyboardVariant } from 'keyboard/index';
import { AudioWindowDragEvent } from 'event/audiowindowdragevent';
import { AudioWindowDragStartEvent } from 'event/audiowindowdragstartevent';
import { KeyboardRangeCreatedEvent, keyboardRangeCreatedEvent } from 'event/keyboardrangecreatedevent';
import { generateId } from 'util/uniqueid';
import { keyboardRangeChangedEvent, KeyboardRangeChangedEvent } from 'event/keyboardrangechangedevent';
import { Tempo } from 'store/project';

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

export interface AudioWindowGridRow<K extends string, T> {
    id: K;
    data: T;
    frame: Frame;
}

export interface AudioWindowGridTickRange<T> {
    range: TickRange;
    rowId: string;
    variant: NoteVariant;
    data: T;
}

interface AudioWindowGridRowViewModel<T> {
    id: string;
    data: T;
    style: string;
}

export default class GridElement<K extends string, T extends NoteViewData> extends LightningElement {
    @api tickRanges: AudioWindowGridTickRange<any>[];
    @api rows: AudioWindowGridRow<K, T>[] = [];
    @api visibleRange: TickRange;
    @api rangePadding: Frame = { height: 0, width: 0 };
    @api variant: KeyboardVariant = KeyboardVariant.Piano;
    @api canvas: boolean = false;
    @api tempo: Tempo;
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
    get isPiano(): boolean {
        return this.variant === KeyboardVariant.Piano;
    }

    get rowViewModels():AudioWindowGridRowViewModel<any>[] {
        return this.rows.map((row) => {
            const rowFrame = this.rowsRectMap[row.id];
            const height = rowFrame.rect.height;
            return {
                id: row.id,
                data: row.data,
                style: `padding-top:${this.rangePadding.height / 2}px; padding-bottom: ${this.rangePadding.height / 2}px; width:${row.frame.width}; height:${height}px`
            }
        })
    }

    get rowsRectMap(): { [key: string]: { rowId: string, rect: Rect } } {
        const { rangePadding } = this;
        let y = rangePadding.height / 2;
        return this.rows.reduce((seed: { [key: string]: { rowId: string, rect: Rect } }, row) => {
            const height = row.frame.height + (rangePadding.height / 2);
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

            y += height + rangePadding.height;
            return seed;
        }, {});
    }

    findRowFromY(y: number): AudioWindowGridRow<K, T> | null {
        const { rows } = this;
        let rowY = 0;
        for(let i = 0; i < rows.length; i += 1) {
            rowY += rows[i].frame.height;
            if (rowY > y) {
                return rows[i];
            }
        }
        return null;
    }

    get tickRangesViewModels(): AudioWindowTickRange[] {
        return this.tickRanges.map((gridTickRange) => {
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
        const { origin, tick } = evt.detail;
        const row = this.findRowFromY(origin.y + this.mainScrollY);
        if (!row) {
            return;
        }
        const rangeId = generateId();
        const range = tickRange(tick, tickZero);
        this.audioWindowDrag = {
            rangeId,
            range,
        }
        const event: KeyboardRangeCreatedEvent<K> = keyboardRangeCreatedEvent(row.id, rangeId, range);
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
        const nextDuration = tickPlus(audioWindowDrag.range.duration, delta);
        const nextRange = tickRange(audioWindowDrag.range.start, nextDuration);
        const event: KeyboardRangeChangedEvent<K> = keyboardRangeChangedEvent(row.id, audioWindowDrag.rangeId, nextRange);
        this.dispatchEvent(event);
    }
}
