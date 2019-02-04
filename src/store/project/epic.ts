import { CREATE_PROJECT } from './const';
import { flatMap } from 'rxjs/operators';
import { CreateProjectAction } from './action';
import { Transport } from 'tone';
import { empty } from 'rxjs';

let toneTransport: Transport = Transport;

export function getTransport() {
    return toneTransport;
}

export function createProjectEpic(actions) {
    return actions.ofType(CREATE_PROJECT)
        .pipe(
            flatMap((action: CreateProjectAction) => {
                toneTransport.bpm.value = action.payload.tempo.beatsPerMinute;
                toneTransport.start();
                return empty();
            })
        )
}
