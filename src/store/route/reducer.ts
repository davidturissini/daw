import { Record } from 'immutable';
import { Route } from './index';
import { SET_ROUTE } from './const';
import { SetRouteAction } from './action';

export class RouterState extends Record<{
    route: Route<any> | null;
}>({
    route: null
}) {}

function setRouteReducer(state: RouterState, action: SetRouteAction<any>): RouterState {
    const { params, path, name } = action.payload;
    const route = new Route<any>({
        path,
        params,
        name,
    });
    return state.set('route', route);
}

export function reducer(state = new RouterState(), action) {
    switch(action.type) {
        case SET_ROUTE:
            return setRouteReducer(state, action);
    }
    return state;
}
