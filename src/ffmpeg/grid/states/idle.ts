import { GridStateInputs, GridStateNames, GridState, GridFSM } from './types';

export class IdleState implements GridState {
    enter() {}
    exit() {}
    [GridStateInputs.EditButtonClick](cmp: GridFSM) {
        cmp.enterState(GridStateNames.DrawRange);
    }
}
