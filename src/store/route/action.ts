import {
    CREATE_ROUTER,
    SET_ROUTE,
    NAVIGATE,
} from './const';
import { Action } from 'store/index';
import { RouteNames } from './index';

export type NavigateAction<T> = Action<{
    name: string;
    params: T;
}>;
export function navigate<T>(name: string, params: T): NavigateAction<T> {
    return {
        type: NAVIGATE,
        payload: {
            name,
            params,
        }
    }
}

export type CreateRouterAction = Action<{}>;
export function createRouter(): CreateRouterAction {
    return {
        type: CREATE_ROUTER,
        payload: {}
    }
}

export type SetRouteAction<T> = Action<{
    params: T;
    path: string;
    name: RouteNames;
}>

export function setRoute<T>(name: RouteNames, path: string, params: T): SetRouteAction<T> {
    return {
        type: SET_ROUTE,
        payload: {
            path,
            params,
            name,
        }
    }
}
