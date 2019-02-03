import { GridStateInputs, GridStateNames, GridState, GridFSM } from './types';
import { BaseState } from './base';
import { AudioRange } from 'util/audiorange';
import { AudioRangeChangeEvent, AudioRangeCreatedEvent } from '../events';
import { pixelToTime, absolutePixelToTime } from 'util/geometry';
import { timeZero } from 'util/time';
import { generateId } from 'util/uniqueid';
import { quanitizeTime } from 'store/audiowindow';

export class DrawRangeState extends BaseState implements GridState {
    parentId: string | null = null;
    startX: number | null = null;
    rangeId: string | null = null;
    range: AudioRange | null = null;
    enter(fsm: GridFSM) {
        fsm.interactionStateName = GridStateNames.DrawRange;
    }
    [GridStateInputs.GridRowMouseDown](cmp: GridFSM, evt: MouseEvent) {
        evt.preventDefault();
        const { audioWindow } = cmp;
        if (audioWindow === null) {
            return;
        }
        const rect: ClientRect = (evt.target as HTMLElement).getBoundingClientRect();
        this.startX = evt.x;
        const time = absolutePixelToTime(audioWindow.rect, audioWindow.visibleRange, evt.x - rect.left);
        const quanitized = quanitizeTime(audioWindow, time, cmp.project.tempo);
        const range = this.range = new AudioRange(quanitized, timeZero);
        const id = this.rangeId = generateId();
        const parentId = this.parentId = (evt.target as HTMLElement).getAttribute('data-row-id') as string;
        const event: AudioRangeCreatedEvent = new CustomEvent('audiorangecreated', {
            bubbles: true,
            composed: true,
            detail: {
                id,
                range,
                parentId,
                beatRange: range.toBeatRange(cmp.project.tempo),
            },
        });
        cmp.dispatchEvent(event);
    }
    [GridStateInputs.DocumentMouseMove](cmp: GridFSM, evt: MouseEvent) {
        if (this.startX && this.rangeId && this.range && this.parentId) {
            const { audioWindow } = cmp;
            if (audioWindow === null) {
                return;
            }
            const diff = evt.x - this.startX;
            const time = pixelToTime(audioWindow.rect, audioWindow.visibleRange, diff);
            const quanitized = quanitizeTime(audioWindow, time, cmp.project.tempo);
            const next = new AudioRange(this.range.start, quanitized);

            const event: AudioRangeChangeEvent = new CustomEvent('audiorangechange', {
                bubbles: true,
                composed: true,
                detail: {
                    range: next,
                    id: this.rangeId,
                    parentId: this.parentId,
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
