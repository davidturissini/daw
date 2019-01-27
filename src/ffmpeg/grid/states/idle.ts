import { GridStateInputs, GridStateNames, GridState, GridFSM } from './types';
import { BaseState } from './base';

export class IdleState extends BaseState implements GridState {
    [GridStateInputs.EditButtonClick](cmp: GridFSM) {
        cmp.enterState(GridStateNames.DrawRange);
    }
}
