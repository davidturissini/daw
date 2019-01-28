import { GridStateInputs, GridStateNames, GridState, GridFSM } from './types';
import { BaseState } from './base';
import { GridClickEvent } from './../events';
import { absolutePixelToTime } from 'util/geometry';

export class IdleState extends BaseState implements GridState {
    [GridStateInputs.EditButtonClick](cmp: GridFSM) {
        cmp.enterState(GridStateNames.DrawRange);
    }
    [GridStateInputs.GridContainerClick](cmp: GridFSM, evt: MouseEvent) {
        const { audioWindow } = cmp;
        if (audioWindow === null) {
            return;
        }
        const time = absolutePixelToTime(audioWindow.rect, audioWindow.visibleRange, evt.x - audioWindow.rect.x);
        const event: GridClickEvent = new CustomEvent('gridclick', {
            bubbles: true,
            composed: true,
            detail: {
                time,
            }
        });
        cmp.dispatchEvent(event);
    }
}
