import { setRoute, NavigateAction } from './action';
import { CREATE_ROUTER, NAVIGATE } from './const';
import { Observable, empty as emptyObservable } from 'rxjs';
import { switchMap, flatMap } from 'rxjs/operators';
import { RouteNames, router } from './index';

export function navigateEpic(actions) {
    return actions.ofType(NAVIGATE)
        .pipe(
            flatMap((action: NavigateAction<any>) => {
                const { name, params } = action.payload;
                router.navigate(name, params);
                return emptyObservable();
            })
        )
}

export function createRouterEpic(actions) {
    return actions.ofType(CREATE_ROUTER)
        .pipe(
            switchMap(() => {
                return Observable.create((o) => {
                    const unsubscribe = router.subscribe(({ route }) => {
                        o.next(
                            setRoute<any>(route.name as RouteNames, route.path, route.params)
                        );
                    });

                    router.start();
                    return unsubscribe;
                })
            })
        )
}
