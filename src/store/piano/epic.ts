import {
    STOP_PIANO,
    PLAY_KEY,
    STOP_KEY,
} from './const';
import {
    PlayKeyAction,
    StopKeyAction,
    StopPianoAction,
} from './action';
import { flatMap, take, merge, filter, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { audioContext } from 'util/sound';
import { createOscillator } from 'store/instrument';

export function playKeyEpic(actions) {
    return actions.ofType(PLAY_KEY)
        .pipe(
            flatMap((action: PlayKeyAction) => {
                const { frequency, name, pianoId } = action.payload;
                const oscillator = createOscillator(audioContext, frequency);
                oscillator.connect(audioContext.destination);
                return Observable.create((o) => {
                    console.log('starting');
                    oscillator.start();

                    return () => {
                        console.log('stopping');
                        oscillator.stop();
                    }
                })
                .pipe(
                    takeUntil(
                        actions.ofType(STOP_KEY)
                            .pipe(
                                filter((action: StopKeyAction) => {
                                    return action.payload.name === name;
                                }),
                                merge(
                                    actions.ofType(STOP_PIANO)
                                        .pipe(
                                            filter((action: StopPianoAction) => {
                                                return action.payload.pianoId === pianoId;
                                            })
                                        )
                                ),
                                take(1),
                            )
                    )
                );
            })
        )
}
