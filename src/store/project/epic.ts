import { CREATE_PROJECT } from './const';
import { flatMap } from 'rxjs/operators';
import { CreateProjectAction } from './action';
import { Transport } from 'tone';
import { empty } from 'rxjs';


export function getTransport() {
    return Transport;
}

export function createProjectEpic(actions) {
    return actions.ofType(CREATE_PROJECT)
        .pipe(
            flatMap((action: CreateProjectAction) => {
                Transport.bpm.value = action.payload.tempo.beatsPerMinute;
                return empty();
            })
        )
}
