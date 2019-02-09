import { GridStateInputs, GridState, GridFSM } from './types';
import { BaseState } from './base';
import { AudioRange } from 'util/audiorange';
import { AudioRangeChangeEvent } from '../events';
import { quanitizeTime } from 'store/audiowindow';

export class RangeDragState extends BaseState implements GridState {
    range: AudioRange;
    parentId: string;
    id: string;
    constructor(parentId: string, id: string, initialRange: AudioRange) {
        super();
        this.range = initialRange;
        this.parentId = parentId;
        this.id = id;
    }

    [GridStateInputs.RangeDrag](fsm: GridFSM, evt: DragEvent) {
        const { audioWindow } = fsm;
        if (!audioWindow) {
            return;
        }
        const rect: ClientRect = (evt.target as HTMLElement).getBoundingClientRect();
        const rowY = evt.y - rect.top;
        const rowKey = Object.keys(fsm.rowFrames).find((key) => {
            const rowFrame = fsm.rowFrames[key];
            return (rowFrame.rect.y + rowFrame.rect.height > rowY);
        });

        if (!rowKey) {
            return;
        }

        const { duration: rangeDuration } = this.range;
        const nextStart = this.range.start.plus(evt.detail.time);
        this.range = new AudioRange(
            nextStart,
            rangeDuration,
        );

        const quanitizedRange = new AudioRange(
            quanitizeTime(audioWindow, nextStart, fsm.project.tempo),
            rangeDuration
        );
        const event: AudioRangeChangeEvent = new CustomEvent('audiorangechange', {
            bubbles: true,
            composed: true,
            detail: {
                range: quanitizedRange,
                id: this.id,
                parentId: this.parentId,
                beatRange: quanitizedRange.toBeatRange(fsm.project.tempo)
            }
        });
        fsm.dispatchEvent(event);
    }

    [GridStateInputs.RangeDragEnd](fsm: GridFSM, evt: RangeDragEvent) {
        fsm.enterPreviousState();
    }
}
