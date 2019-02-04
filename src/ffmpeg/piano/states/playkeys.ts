import { PianoStateInputNames, PianoState, PianoStateNames } from './types';
import { PianoStateMachine } from './index';
import { appStore } from 'store/index';
import { stopPianoKey, playPianoKey } from 'store/player/action';
import { PianoKey } from 'util/sound';

export class PlayKeysState extends PianoState {
    pianoKey: PianoKey;
    keysPlaying: {
        [key in PianoKey]?: boolean;
    }
    constructor(pianoKey: PianoKey) {
        super();
        this.pianoKey = pianoKey;
        this.keysPlaying = {};
    }

    enter(fsm: PianoStateMachine<any>) {
        this.keysPlaying[this.pianoKey] = true;
        appStore.dispatch(
            playPianoKey(fsm.cmp.audioContext, fsm.cmp.instrument, this.pianoKey, fsm.cmp.tempo)
        );
    }

    exit(fsm: PianoStateMachine<any>) {
        Object.keys(this.keysPlaying).forEach((pianoKey: PianoKey) => {
            appStore.dispatch(
                stopPianoKey(fsm.cmp.instrument, pianoKey)
            );
        });
    }

    [PianoStateInputNames.PianoKeyMouseEnter](fsm: PianoStateMachine<any>, evt: MouseEvent) {
        evt.stopPropagation();
        Object.keys(this.keysPlaying).forEach((pianoKey: PianoKey) => {
            appStore.dispatch(
                stopPianoKey(fsm.cmp.instrument, pianoKey)
            );
        });

        const target = (evt.target as Element);
        const pianoKey = target.getAttribute('data-note-name') as PianoKey;
        this.keysPlaying[pianoKey] = true;
        appStore.dispatch(
            playPianoKey(fsm.cmp.audioContext, fsm.cmp.instrument, pianoKey, fsm.cmp.tempo)
        )
    }

    [PianoStateInputNames.DocumentMouseUp](fsm: PianoStateMachine<any>, evt: MouseEvent) {
        fsm.enterState(PianoStateNames.Idle);
    }
}
