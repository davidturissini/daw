import { Record } from 'immutable';

export class Project extends Record<{
    bpm: number
}>({
    bpm: 128
}) {}
