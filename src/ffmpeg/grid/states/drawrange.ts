import { GridStateInputs, GridStateNames, GridState, GridFSM } from './types';
import { BaseState } from './base';
import { AudioRange } from 'util/audiorange';
import { AudioRangeChangeEvent, AudioRangeCreatedEvent } from '../events';
import { pixelToTime, absolutePixelToTime } from 'util/geometry';
import { timeZero } from 'util/time';
import { generateId } from 'util/uniqueid';
import { quanitizeTime } from 'store/audiowindow';
import { getRowIndex } from './../util';

export class DrawRangeState extends BaseState implements GridState {
    startX: number | null = null;
    rangeId: string | null = null;
    range: AudioRange | null = null;
    rowIndex: number | null = null;
    enter(fsm: GridFSM) {
        fsm.interactionStateName = GridStateNames.DrawRange;
    }
    [GridStateInputs.GridContainerMouseDown](cmp: GridFSM, evt: MouseEvent) {
        const { globalContainerAudioWindowRect, mainScrollY, visibleRange, quanitization } = cmp;
        if (globalContainerAudioWindowRect === null) {
            return;
        }

        if (evt.target !== evt.currentTarget) {
            // event bubbled
            return;
        }
        evt.preventDefault();
        console.log(evt.y, globalContainerAudioWindowRect.y, mainScrollY)
        const rowKey = getRowIndex(evt.y - globalContainerAudioWindowRect.y + mainScrollY, cmp.rowFrames);
        const row = cmp.rowFrames[rowKey];
        const rowIndex = this.rowIndex = row.index;
        this.startX = evt.x;
        const time = absolutePixelToTime(globalContainerAudioWindowRect, visibleRange, evt.x - globalContainerAudioWindowRect.x);
        const quanitized = quanitizeTime(quanitization, time, cmp.project.tempo);
        const range = this.range = new AudioRange(quanitized, timeZero);
        const id = this.rangeId = generateId();
        const event: AudioRangeCreatedEvent = new CustomEvent('audiorangecreated', {
            bubbles: true,
            composed: true,
            detail: {
                id,
                range,
                rowIndex,
                beatRange: range.toBeatRange(cmp.project.tempo),
            },
        });
        cmp.dispatchEvent(event);
    }
    [GridStateInputs.DocumentMouseMove](cmp: GridFSM, evt: MouseEvent) {
        if (this.startX && this.rangeId && this.range && this.rowIndex !== null) {
            const { containerAudioWindowRect, visibleRange, quanitization } = cmp;
            if (containerAudioWindowRect === null) {
                return;
            }
            const diff = evt.x - this.startX;
            const time = pixelToTime(containerAudioWindowRect, visibleRange, diff);
            const quanitized = quanitizeTime(quanitization, time, cmp.project.tempo);
            const next = new AudioRange(this.range.start, quanitized);

            const event: AudioRangeChangeEvent = new CustomEvent('audiorangechange', {
                bubbles: true,
                composed: true,
                detail: {
                    range: next,
                    id: this.rangeId,
                    rowIndex: this.rowIndex,
                    beatRange: next.toBeatRange(cmp.project.tempo),
                },
            });
            cmp.dispatchEvent(event);
        }
    }
    [GridStateInputs.DocumentMouseUp](cmp: GridFSM, evt: MouseEvent) {
        cmp.enterState(GridStateNames.DrawRange, []);
    }
    [GridStateInputs.PanButtonClick](cmp: GridFSM) {
        cmp.enterState(GridStateNames.Idle, []);
    }
}
