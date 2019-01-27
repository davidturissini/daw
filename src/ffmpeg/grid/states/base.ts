import { GridStateInputs, GridState, GridFSM } from './types';
import { GridCloseEvent } from './../events';

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
}
