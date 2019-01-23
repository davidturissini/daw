import { Record } from 'immutable';

export class ProjectState extends Record<{
    bpm: number;
}>({
    bpm: 128,
}) {

}

export function reducer(state = new ProjectState, action) {
    return state;
}
