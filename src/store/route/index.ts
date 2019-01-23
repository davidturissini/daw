import { Record } from 'immutable';

export enum RouteNames {
    Home = 'Home',
    SegmentEdit = 'SegmentEdit',
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


