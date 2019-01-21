import { LightningElement } from 'lwc';
import { appStore } from 'store/index';
import { createTrack, setTrackInstrument } from 'store/audiotrack/action';
import { createInstrument } from 'store/instrument/action';
import { generateId } from './../../util/uniqueid'
import { InstrumentType, OscillatorNodeTypes,  InstrumentDataOscillator} from 'store/instrument';

export default class Instruments extends LightningElement {
    handleOscillatorNodeClick() {
        const id = generateId();
        const instrumentId = generateId();
        appStore.dispatch(
            createInstrument<InstrumentDataOscillator>(
                instrumentId,
                InstrumentType.Oscillator,
                {
                    frequency: 440,
                    detune: 0,
                    type: OscillatorNodeTypes.sine,
                }
            )
        );
        appStore.dispatch(
            createTrack(
                id,
                'New Track'
            )
        );

        appStore.dispatch(
            setTrackInstrument(
                id,
                instrumentId,
            )
        )
    }
}
