import { GridStateInputs, GridStateNames, GridState, GridFSM } from './types';
import { GridCloseEvent } from './../events';
import { RangeDragStartEvent } from 'cmp/audiorange/audiorange';
import { pixelToTime } from 'util/geometry';
import { quanitizeTime } from 'store/audiowindow';
import { setAudioWindowVirtualCursorTime } from 'store/audiowindow/action';
import { appStore } from 'store/index';

export abstract class BaseState implements GridState {
    name: GridStateNames;
    enter() {}
    exit() {}
    [GridStateInputs.CloseButtonClick](cmp: GridFSM) {
        const event: GridCloseEvent = new CustomEvent('gridclose', {
            bubbles: true,
            composed: true,
            detail: {}
        });
        cmp.dispatchEvent(event);
    }
    [GridStateInputs.RangeDragStart](cmp: GridFSM, evt: RangeDragStartEvent) {
        const parentId = (evt.target as HTMLElement).getAttribute('data-row-id') as string;
        cmp.enterState(GridStateNames.RangeDrag,
            parentId,
            evt.detail.itemId,
            evt.detail.range
        );
    }
    [GridStateInputs.GridContainerMouseMove](cmp: GridFSM, evt: MouseEvent) {
        const { audioWindow } = cmp;
        if (audioWindow === null) {
            return;
        }
        const { x } = evt;
        const time = pixelToTime(audioWindow.rect, audioWindow.visibleRange, x - audioWindow.rect.x);
        const quanitized = quanitizeTime(audioWindow, time);
        appStore.dispatch(
            setAudioWindowVirtualCursorTime(audioWindow.id, quanitized)
        );
    }
    [GridStateInputs.GridContainerMouseLeave](cmp: GridFSM, evt: MouseEvent) {
        const { audioWindow } = cmp;
        if (audioWindow === null) {
            return;
        }
        appStore.dispatch(
            setAudioWindowVirtualCursorTime(audioWindow.id, null)
        );
    }
}
