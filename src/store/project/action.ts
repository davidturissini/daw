import { CREATE_PROJECT, SET_PROJECT_TEMPO } from './const';
import { Tempo } from './index';
import { Action } from 'store/index';

export type SetProjectTempoAction = Action<{
    projectId: string;
    tempo: Tempo;
}>
export function setProjectTempo(projectId: string, tempo: Tempo): SetProjectTempoAction {
    return {
        type: SET_PROJECT_TEMPO,
        payload: {
            projectId,
            tempo,
        }
    }
}

export type CreateProjectAction = Action<{
    name: string;
    tempo: Tempo;
    projectId: string;
}>

export function createProject(projectId: string, name: string, tempo: Tempo): CreateProjectAction {
    return {
        type: CREATE_PROJECT,
        payload: {
            projectId,
            name,
            tempo,
        }
    }
}
