import { GridStateInputs, GridStateNames, GridState, GridFSM } from './types';
import { GridCloseEvent } from './../events';
import { RangeDragStartEvent } from 'cmp/audiorange/audiorange';

export class BaseState implements GridState {
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
}
