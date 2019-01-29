import { GridStateInputs, GridStateNames, GridState, GridFSM } from './types';
import { BaseState } from './base';
import { AudioRange } from 'util/audiorange';
import { RangeDragEvent } from 'cmp/audiorange/audiorange';
import { AudioRangeChangeEvent } from '../events';
import { quanitizeTime } from 'store/audiowindow';

export class RangeDragState extends BaseState implements GridState {
    name: GridStateNames.RangeDrag;
    range: AudioRange;
    parentId: string;
    id: string;
    constructor(parentId: string, id: string, initialRange: AudioRange) {
        super();
        this.range = initialRange;
        this.parentId = parentId;
        this.id = id;
    }

    [GridStateInputs.RangeDrag](fsm: GridFSM, evt: RangeDragEvent) {
        const { audioWindow } = fsm;
        if (!audioWindow) {
            return;
        }
        const { duration: rangeDuration } = this.range;
        const nextStart = this.range.start.plus(evt.detail.time);
        this.range = new AudioRange(
            nextStart,
            rangeDuration,
        );

        const quanitizedRange = new AudioRange(
            quanitizeTime(audioWindow, nextStart),
            rangeDuration
        );
        const event: AudioRangeChangeEvent = new CustomEvent('audiorangechange', {
            bubbles: true,
            composed: true,
            detail: {
                range: quanitizedRange,
                id: this.id,
                parentId: this.parentId,
            }
        });
        fsm.dispatchEvent(event);
    }

    [GridStateInputs.RangeDragEnd](fsm: GridFSM, evt: RangeDragEvent) {
        fsm.enterPreviousState();
    }
}
