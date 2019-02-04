import { PianoStateInputNames, PianoState, PianoStateNames } from './types';
import { PianoStateMachine } from './index';
import { PianoKey } from 'util/sound';

export class IdleState extends PianoState {
    [PianoStateInputNames.PianoKeyMouseDown](fsm: PianoStateMachine<any>, evt: MouseEvent) {
        const target = (evt.target as Element);
        const pianoKey = target.getAttribute('data-note-name') as PianoKey;

        fsm.enterState(PianoStateNames.PlayKeys, pianoKey);
    }
}
