import { LightningElement, track, api } from 'lwc';
import { Time, Beat, createBeat } from '../../util/time';
import { Rect } from 'util/geometry';
import { AudioRange, BeatRange } from 'util/audiorange';
import { Color } from 'util/color';
import { Tempo } from 'store/project';
import { isAudioRangeElement, AudioRangeElement, AudioWindowRectChangeEvent } from 'cmp/audiowindow/audiowindow';

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

export default class GridElement extends LightningElement {
    @api range: AudioRange;
    @api tempo: Tempo;
    @api spaceBetween: number = 0;
    @api noLanes: boolean = false;
    @track rowFrames: GridRowRectMap | null = null;
    @track hoverCursorMs: number | null = null;
    @track quanitization: Beat = createBeat(1 / 4);

    get hoverCursor(): Time | null {
        const { hoverCursorMs } = this;
        if (!hoverCursorMs) {
            return null;
        }
        return new Time(hoverCursorMs);
    }

    /*
     *
     * Grid Lines
     *
     */
    get rowViewModels() {
        const { rowFrames } = this;
        if (!rowFrames) {
            return [];
        }
        return Object.keys(rowFrames).map((rowId) => {
            const { rect } = rowFrames[rowId];
            return {
                id: rowId,
                style: `height: ${rect.height}px;`
            }
        });
    }

    get rowLanes(): Array<{ style: string, className: string, key: string }> {
        const { rowFrames } = this;
        if (!rowFrames) {
            return [];
        }

        return Object.keys(rowFrames).map((rowId, index) => {
            const { rect } = rowFrames[rowId];
            const classNames = ['grid-lane'];
            if (index % 2 === 1) {
                classNames.push('grid-lane--odd');
            }
            return {
                key: rowId,
                className: classNames.join(' '),
                style: `transform: translateY(${rect.y}px); height: ${rect.height}px;`
            }
        });
    }

    onColLeftSlotChange(evt) {
        const target = evt.target as HTMLSlotElement;
        requestAnimationFrame(() => {
            const rowFrames = {};
            target.assignedElements().forEach((elm: HTMLElement, index: number) => {
                const rowId = elm.getAttribute('data-row-id') as string;
                const box = elm.getBoundingClientRect();
                const rect: Rect = {
                    height: box.height,
                    width: box.width,
                    x: elm.offsetLeft,
                    y: elm.offsetTop,
                };
                rowFrames[rowId] = {
                    index,
                    rect,
                }
            });

            this.rowFrames = rowFrames;
            this.renderAssignedAudioRangeElements();
        });
    }

    assignedAudioRangeElements: AudioRangeElement[] = [];
    onRangeSlotChange(evt) {
        const target = evt.target as HTMLSlotElement;
        const { globalContainerAudioWindowRect } = this;
        this.assignedAudioRangeElements = target.assignedElements().filter(isAudioRangeElement);
        if (!globalContainerAudioWindowRect) {
            return;
        }
        requestAnimationFrame(() => {
            this.renderAssignedAudioRangeElements();
        });
    }

    renderAssignedAudioRangeElements() {
        const { rowFrames } = this;
        if (rowFrames === null) {
            return;
        }
        this.assignedAudioRangeElements.forEach((elm: AudioRangeElement) => {
            const rowId = elm.getAttribute('data-row-id') as string;
            const rowFrame = rowFrames[rowId];
            elm.style.top = `${rowFrame.rect.y}px`;
            elm.style.height = `${rowFrame.rect.height}px`;
        })
    }

    containerAudioWindowRect: Rect | null = null;
    globalContainerAudioWindowRect: Rect | null = null;
    onContainerAudioWindowRectChange(evt: AudioWindowRectChangeEvent) {
        this.containerAudioWindowRect = evt.detail.rect;
        this.globalContainerAudioWindowRect = evt.detail.globalRect;
        this.renderAssignedAudioRangeElements();
    }

    mainScrollY: number = 0;
    onMainScroll(evt) {
        this.mainScrollY = evt.target.scrollTop;
    }
}
