import { BaseState } from './base';
import { IdleState } from './idle';
import { play, stop } from './../../../wire/playhead';

export class PlayingState extends BaseState {
    constructor(range) {
        super();
        this.range = range;
    }
    enter() {
        play(this.range);
    }

    exit() {
        stop();
    }

    onStopButtonClick(app, evt) {
        app.enterState(new IdleState());
    }
}
