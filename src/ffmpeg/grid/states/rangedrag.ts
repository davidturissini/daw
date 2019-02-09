import { GridStateInputs, GridState, GridFSM } from './types';
import { BaseState } from './base';
import { AudioRange, toBeatRange } from 'util/audiorange';
import { AudioRangeChangeEvent } from '../events';
import { quanitizeTime } from 'store/audiowindow';
import { pixelToTime } from 'util/geometry';

export class RangeDragState extends BaseState implements GridState {
    range: AudioRange;
    rowIndex: number;
    startX: number;
    startY: number;
    id: string;
    constructor(id: string, rowIndex: number, initialRange: AudioRange, startX: number, startY: number) {
        super();
        this.id = id;
        this.range = initialRange;
        this.rowIndex = rowIndex;
        this.startX = startX;
        this.startY = startY;
    }

    [GridStateInputs.RangeDrag](fsm: GridFSM, evt: DragEvent) {
        const { containerAudioWindowRect, visibleRange, quanitization } = fsm;
        if (containerAudioWindowRect === null) {
            return;
        }
        evt.preventDefault();
        const { duration: rangeDuration } = this.range;
        const dx = evt.x - this.startX;
        const deltaTime = pixelToTime(containerAudioWindowRect, visibleRange, dx);
        const nextStart = this.range.start.plus(deltaTime);
        const quanitizedRange = {
            start: quanitizeTime(quanitization, nextStart, fsm.project.tempo),
            duration: rangeDuration,
        };
        const event: AudioRangeChangeEvent = new CustomEvent('audiorangechange', {
            bubbles: true,
            composed: true,
            detail: {
                rowIndex: this.rowIndex,
                range: quanitizedRange,
                id: this.id,
                parentId: this.rowIndex,
                beatRange: toBeatRange(quanitizedRange, fsm.project.tempo)
            }
        });
        fsm.dispatchEvent(event);
    }

    [GridStateInputs.RangeDragEnd](fsm: GridFSM, evt: DragEvent) {
        fsm.enterPreviousState();
    }
}
