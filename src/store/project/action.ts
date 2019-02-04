import { CREATE_PROJECT } from './const';
import { Tempo } from './index';
import { Action } from 'store/index';

export type CreateProjectAction = Action<{
    name: string;
    tempo: Tempo;
}>

export function createProject(name: string, tempo: Tempo): CreateProjectAction {
    return {
        type: CREATE_PROJECT,
        payload: {
            name,
            tempo,
        }
    }
}
