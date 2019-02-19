import { Record, Map as ImmutableMap } from 'immutable';
import { Project } from './index';
import { CREATE_PROJECT, SET_PROJECT_TEMPO } from './const';
import { CreateProjectAction, SetProjectTempoAction } from './action';

export class ProjectState extends Record<{
    items: ImmutableMap<string, Project>;
    currentProjectId: string | null;
}>({
    items: ImmutableMap(),
    currentProjectId: null,
}) {

}

function createProjectReducer(state: ProjectState, action: CreateProjectAction): ProjectState {
    const { tempo, name, projectId } = action.payload;
    const project = new Project({
        id: projectId,
        name,
        tempo,
    });
    return state.setIn(['items', projectId], project).set('currentProjectId', projectId);
}

function setProjectTempoReducer(state: ProjectState, action: SetProjectTempoAction): ProjectState {
    const { projectId, tempo } = action.payload;
    return state.setIn(['items', projectId, 'tempo'], tempo);
}

export function reducer(state = new ProjectState(), action) {
    switch(action.type) {
        case CREATE_PROJECT:
            return createProjectReducer(state, action);
        case SET_PROJECT_TEMPO:
            return setProjectTempoReducer(state, action);
    }
    return state;
}
