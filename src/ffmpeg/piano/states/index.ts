import { PianoStateMachine as PianoFSM, PianoStateNames } from './types';
import { FiniteStateMachine } from "./fsm";
import { IdleState } from './idle';
import { PlayKeysState } from './playkeys';
import { Instrument } from 'store/instrument';
import { Tempo } from 'store/project';

interface PianoElementInterface {
    audioContext: BaseAudioContext;
    instrument: Instrument<any>;
    tempo: Tempo;
}

export class PianoStateMachine<T extends PianoElementInterface> extends FiniteStateMachine<any, any, any> implements PianoFSM {
    cmp: PianoElementInterface;
    constructor(cmp: T) {
        super();
        this.cmp = cmp;
        this.enterState(PianoStateNames.Idle);
    }
    states = {
        [PianoStateNames.Idle]: IdleState,
        [PianoStateNames.PlayKeys]: PlayKeysState,
    }
}
