import { Record } from 'immutable';
import { Project } from './index';
import { CREATE_PROJECT } from './const';
import { CreateProjectAction } from './action';

export class ProjectState extends Record<{
    currentProject: Project | null;
}>({
    currentProject: null,
}) {

}

function createProjectReducer(state: ProjectState, action: CreateProjectAction): ProjectState {
    const { tempo, name } = action.payload;
    const project = new Project({
        name,
        tempo,
    });
    return state.set('currentProject', project);
}

export function reducer(state = new ProjectState(), action) {
    switch(action.type) {
        case CREATE_PROJECT:
            return createProjectReducer(state, action);
    }
    return state;
}
