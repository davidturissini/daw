import createRouter, { Router } from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { setRoute, NavigateAction } from './action';
import { CREATE_ROUTER, NAVIGATE } from './const';
import { Observable, empty as emptyObservable } from 'rxjs';
import { switchMap, flatMap } from 'rxjs/operators';
import { RouteNames } from './index';

const routes: Array<{ name: RouteNames, path: string }> = [{
    name: RouteNames.Home,
    path: '/'
}, {
    name: RouteNames.SegmentEdit,
    path: '/segments/:segment_id/edit'
}];

let router: Router | null = null;

export function navigateEpic(actions) {
    return actions.ofType(NAVIGATE)
        .pipe(
            flatMap((action: NavigateAction<any>) => {
                const { name, params } = action.payload;
                if (router) {
                    router.navigate(name, params);
                }
                return emptyObservable();
            })
        )
}

export function createRouterEpic(actions) {
    return actions.ofType(CREATE_ROUTER)
        .pipe(
            switchMap(() => {
                router = createRouter(routes);
                router.usePlugin(browserPlugin());
                return Observable.create((o) => {
                    const unsubscribe = router!.subscribe(({ route }) => {
                        o.next(
                            setRoute<any>(route.name as RouteNames, route.path, route.params)
                        );
                    });

                    router!.start();
                    return unsubscribe;
                })
            })
        )
}
