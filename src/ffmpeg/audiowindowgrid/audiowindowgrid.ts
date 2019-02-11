import { LightningElement, track, api } from 'lwc';
import { Rect, Frame, frameToCSS } from 'util/geometry';
import { AudioRange, BeatRange } from 'util/audiorange';
import { Color } from 'util/color';
import { TickRange, Tick, QUARTER_BEAT } from 'store/tick';
import { AudioWindowTickRange } from 'cmp/audiowindow/audiowindow';
import { NoteViewData, NoteVariant } from 'notes/index';

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

export default class GridElement<K extends string, T extends NoteViewData> extends LightningElement {
    @api tickRanges: AudioWindowGridTickRange<any>[];
    @api rows: AudioWindowGridRow<K, T>[] = [];
    @api visibleRange: TickRange;
    @api rangePadding: Frame;
    @track resolution: Tick = QUARTER_BEAT;

    get rowViewModels() {
        return this.rows.map((row) => {
            return {
                id: row.id,
                data: row.data,
                style: frameToCSS(row.frame),
            }
        })
    }

    get rowsRectMap(): { [key: string]: { rowId: string, rect: Rect } } {
        let y = 0;
        return this.rows.reduce((seed: { [key: string]: { rowId: string, rect: Rect } }, row) => {
            const { height } = row.frame;
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

            y += height;
            return seed;
        }, {});
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

    // /*
    //  *
    //  * Grid Lines
    //  *
    //  */
    // get rowViewModels() {
    //     const { rowFrames } = this;
    //     if (!rowFrames) {
    //         return [];
    //     }
    //     return Object.keys(rowFrames).map((rowId) => {
    //         const { rect } = rowFrames[rowId];
    //         return {
    //             id: rowId,
    //             style: `height: ${rect.height}px;`
    //         }
    //     });
    // }

    // get rowLanes(): Array<{ style: string, className: string, key: string }> {
    //     const { rowFrames } = this;
    //     if (!rowFrames) {
    //         return [];
    //     }

    //     return Object.keys(rowFrames).map((rowId, index) => {
    //         const { rect } = rowFrames[rowId];
    //         const classNames = ['grid-lane'];
    //         if (index % 2 === 1) {
    //             classNames.push('grid-lane--odd');
    //         }
    //         return {
    //             key: rowId,
    //             className: classNames.join(' '),
    //             style: `transform: translateY(${rect.y}px); height: ${rect.height}px;`
    //         }
    //     });
    // }

    mainScrollY: number = 0;
    onMainScroll(evt) {
        this.mainScrollY = evt.target.scrollTop;
    }
}
