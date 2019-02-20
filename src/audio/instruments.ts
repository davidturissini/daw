import { InstrumentAudioNode } from "store/instrument/types";
import { CREATE_INSTRUMENT, SET_INSTRUMENT_DATA, SET_INSTRUMENT_VOLUME } from "store/instrument/const";
import { flatMap, filter, takeUntil } from "rxjs/operators";
import { CreateInstrumentAction, SetInstrumentDataAction, SetInstrumentVolumeAction } from "store/instrument/action";
import { createInstrumentNode } from "store/instrument";
import { Meter as ToneMeter, Gain as ToneGain, Master as ToneMaster, Transport } from 'tone';
import { Subscription, Observable, empty } from "rxjs";
import { PLAY_PIANO_KEY, STOP_PIANO_KEY } from "store/player/const";
import { PlayPianoKeyAction, StopPianoKeyAction } from "store/player/action";
import { timeZero } from "util/time";
import { SET_MASTER_OUT_GAIN } from "store/masterout/const";
import { SetMasterOutGainAction } from "store/masterout/action";

const emptyObservable = empty();

// Tonejs bindings
Transport.PPQ = 960;

export const masterOutMeter = new ToneMeter(0.8);
const masterOutGain = new ToneGain(0, 'db');
ToneMaster.chain(masterOutGain, masterOutMeter);

const masterOut = ToneMaster;

export const instrumentNodes: { [key: string]: InstrumentAudioNode<any> } = {};
export const instrumentMeters: { [key: string]: ToneMeter } = {};

export function createInstrumentEpic(actions) {
    return actions.ofType(CREATE_INSTRUMENT)
        .pipe(
            flatMap((action: CreateInstrumentAction<any>) => {
                const { id: instrumentId, data, type } = action.payload;
                const instrumentNode = createInstrumentNode(type, data);
                const meter = new ToneMeter(0.8);
                meter.connect(masterOut);
                instrumentNode.connect(meter);
                instrumentNodes[instrumentId] = instrumentNode;
                instrumentMeters[instrumentId] = meter;

                return Observable.create((o) => {
                    const subscription: Subscription = actions.ofType(SET_INSTRUMENT_DATA)
                        .pipe(
                            filter((action: SetInstrumentDataAction<any>) => {
                                return action.payload.instrumentId === instrumentId;
                            })
                        )
                        .subscribe((action: SetInstrumentDataAction<any>) => {
                            instrumentNode.update(action.payload.data);
                        });

                    return () => subscription.unsubscribe();
                })
            })
        )
}

export function playPianoKeyEpic(actions) {
    return actions.ofType(PLAY_PIANO_KEY)
        .pipe(
            flatMap((action: PlayPianoKeyAction) => {
                const { instrumentId, key } = action.payload;
                const instrumentNode = instrumentNodes[instrumentId];
                Observable.create((o) => {
                    instrumentNode.trigger(key, 1, timeZero, null, null)

                    return () => {
                        instrumentNode.release();
                    }
                })
                .pipe(
                    takeUntil(
                        actions.ofType(STOP_PIANO_KEY)
                            .pipe(
                                filter((action: StopPianoKeyAction) => {
                                    return action.payload.instrumentId === instrumentId && action.payload.key === key;
                                })
                            )
                    )
                )
                .subscribe(() => {

                })

                return emptyObservable;
            })
        )
}

export function setInstrumentVolumeEpic(actions) {
    return actions.ofType(SET_INSTRUMENT_VOLUME)
        .pipe(
            flatMap((action: SetInstrumentVolumeAction) => {
                const { instrumentId, volume } = action.payload;
                const instrumentNode = instrumentNodes[instrumentId];
                instrumentNode.setVolume(volume);
                return emptyObservable;
            })
        )
}

export function setMasterOutGainEpic(actions) {
    return actions.ofType(SET_MASTER_OUT_GAIN)
        .pipe(
            flatMap((action: SetMasterOutGainAction) => {
                masterOutGain.gain.setValueAtTime(action.payload.gain.value, 0);
                return emptyObservable;
            })
        )
}
