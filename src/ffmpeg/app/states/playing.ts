import { BaseState } from './base';
import { IdleState } from './idle';
import { stop } from '../../../wire/playhead';
import { AudioRange } from '../../../util/audiorange';
import { audioContext } from './../../../wire/audiosource';

export class PlayingState extends BaseState {
    range: AudioRange;
    constructor(range) {
        super();
        this.range = range;
    }
    enter() {
        const node = audioContext.createOscillator();
        node.type = 'triangle';
        node.frequency.setValueAtTime(440, audioContext.currentTime); // value in hertz
        node.connect(audioContext.destination);
        node.start();
    }

    exit() {
        stop();
    }

    onStopButtonClick(app, evt) {
        app.enterState(new IdleState());
    }
}
