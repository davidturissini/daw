import { Record } from 'immutable';
import createRouter, { Router, Route as Router5Route } from 'router5';
import browserPlugin from 'router5-plugin-browser';

export enum RouteNames {
    ConcertMode = 'ConcertMode',
    LoopEdit = 'ConcertMode.LoopEdit',
    ConcertInstrumentEdit = 'ConcertMode.InstrumentEdit'
}

export class Route<T> extends Record<{
    params: any;
    path: string;
    name: RouteNames;
}>({
    params: {},
    path: '',
    name: RouteNames.ConcertMode,
}) {
    params: T
}

export interface SegmentEditRouteParams {
    segment_id: string;
}

const routes: Router5Route[] = [{
    name: RouteNames.ConcertMode,
    path: '/',
}, {
    name: RouteNames.LoopEdit,
    path: '/loops/:loop_id'
}, {
    name: RouteNames.ConcertInstrumentEdit,
    path: '/instruments/:instrument_id'
}];


export const router: Router = createRouter(routes);

router.usePlugin(browserPlugin());

export function routeIsActive(name: RouteNames, params?: any): boolean {
    return router.isActive(name, params, false, true);
}
