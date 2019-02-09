import { GridState } from './types';
import { BaseState } from './base';
import { Time } from 'util/time';

export class DurationCursorDragState extends BaseState implements GridState {
    time: Time;

    constructor(initialTime: Time) {
        super();
        this.time = initialTime;
    }

}
