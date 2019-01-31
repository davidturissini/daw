import { Record } from 'immutable';
import createRouter, { Router, Route as Router5Route } from 'router5';
import browserPlugin from 'router5-plugin-browser';

export enum RouteNames {
    Home = 'Home',
    SegmentEdit = 'Home.SegmentEdit',
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
    name: RouteNames.Home,
}) {
    params: T
}

export interface SegmentEditRouteParams {
    segment_id: string;
}

const routes: Router5Route[] = [{
    name: RouteNames.Home,
    path: '/',
}, {
    name: RouteNames.SegmentEdit,
    path: '/segments/:segment_id/edit'
}, {
    name: RouteNames.ConcertMode,
    path: '/concert',
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
