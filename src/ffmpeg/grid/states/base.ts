import { GridStateInputs, GridState, GridFSM } from './types';
import { GridCloseEvent } from './../events';
import { absolutePixelToTime } from 'util/geometry';
import { quanitizeTime } from 'store/audiowindow';
import { isAudioRangeElement } from 'cmp/audiowindow/audiowindow';
import { getRowIndex } from './../util';

export abstract class BaseState implements GridState {
    enter(fsm: GridFSM) {}
    exit(fsm: GridFSM) {}
    [GridStateInputs.CloseButtonClick](cmp: GridFSM) {
        const event: GridCloseEvent = new CustomEvent('gridclose', {
            bubbles: true,
            composed: true,
            detail: {}
        });
        cmp.dispatchEvent(event);
    }
    [GridStateInputs.RangeDragStart](cmp: GridFSM, evt: DragEvent) {
        const target = evt.target as HTMLElement;
        const { containerAudioWindowRect } = cmp;
        if (!isAudioRangeElement(target) || containerAudioWindowRect === null) {
            return;
        }

        const rowIndex = getRowIndex(evt.y, cmp.rowFrames);
        console.log(rowIndex);
        // cmp.enterState(GridStateNames.RangeDrag,
        //     rowIndex,
        //     target.range,
        // );
    }
    [GridStateInputs.GridContainerMouseMove](cmp: GridFSM, evt: MouseEvent) {
        const { globalContainerAudioWindowRect, visibleRange, quanitization } = cmp;
        if (globalContainerAudioWindowRect === null) {
            return;
        }

        const { x } = evt;
        const time = absolutePixelToTime(globalContainerAudioWindowRect, visibleRange, x - globalContainerAudioWindowRect.x);
        const quanitized = quanitizeTime(quanitization, time, cmp.project.tempo);
        cmp.hoverCursorMs = quanitized.milliseconds;
    }
    [GridStateInputs.GridContainerMouseLeave](cmp: GridFSM, evt: MouseEvent) {
        cmp.hoverCursorMs = null;
    }
}
