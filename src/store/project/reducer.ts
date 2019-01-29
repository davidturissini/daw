import { Record } from 'immutable';
import { Tempo } from './index';

export class ProjectState extends Record<{
    tempo: Tempo;
}>({
    tempo: new Tempo(128)
}) {

}

export function reducer(state = new ProjectState(), action) {
    return state;
}
