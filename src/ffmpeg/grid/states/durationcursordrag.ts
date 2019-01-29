import { GridStateInputs, GridState, GridFSM } from './types';
import { BaseState } from './base';
import { Time } from 'util/time';
import { CursorDragEvent } from 'cmp/cursor/cursor';
import { AudioRange } from 'util/audiorange';
import { GridRangeChangeEvent } from '../events';
import { quanitizeTime } from 'store/audiowindow';

export class DurationCursorDragState extends BaseState implements GridState {
    time: Time;

    constructor(initialTime: Time) {
        super();
        this.time = initialTime;
    }

    [GridStateInputs.DurationCursorDrag](fsm: GridFSM, evt: CursorDragEvent) {
        const { range, audioWindow } = fsm;
        if (range === null || audioWindow === null) {
            return;
        }

        const duration = this.time = evt.detail.time.plus(this.time);
        const quanitized = quanitizeTime(audioWindow, duration, fsm.project.tempo);

        const nextRange = new AudioRange(range.start, quanitized);
        const event: GridRangeChangeEvent = new CustomEvent('gridrangechange', {
            bubbles: true,
            composed: true,
            detail: {
                range: nextRange,
            }
        });

        fsm.dispatchEvent(event);
    }

    [GridStateInputs.DurationCursorDragEnd](fsm: GridFSM, evt: CursorDragEvent) {
        fsm.enterPreviousState();
    }
}
