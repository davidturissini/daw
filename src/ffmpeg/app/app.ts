import { LightningElement, wire, track } from 'lwc';
import { wireSymbol, appStore } from 'store/index';
import { createRouter } from 'store/route/action';
import { RouterState } from 'store/route/reducer';
import { RouteNames, routeIsActive } from 'store/route';
import { ProjectState } from 'store/project/reducer';
import { Time } from 'util/time';
import { Rect } from 'util/geometry';
import { createProject } from 'store/project/action';
import { Tempo } from 'store/project';

export default class AppElement extends LightningElement {
    @track cursor: Time | null = null;
    @track rect: Rect | null = null;

    @wire(wireSymbol, {
        paths: {
            router: ['router'],
            project: ['project'],
        }
    })
    storeData: {
        data: {
            router: RouterState;
            project: ProjectState;
        }
    }

    get route() {
        return this.storeData.data.router.route;
    }

    /*
     *
     * Layout
     *
    */
    get hasRect(): boolean {
        return this.rect !== null;
    }

    /*
     *
     * Project
     *
    */
    get projectBpm() {
        return this.storeData.data.project.currentProject!.tempo.beatsPerMinute;
    }

    /*
     *
     * Routing
     *
    */
    get isConcertModeRoute() {
        if (this.route) {
            return routeIsActive(RouteNames.ConcertMode, {});
        }
        return false;
    }

    get isLoopEditRouteActive(): boolean {
        const { route } = this.storeData.data.router;
        if (route) {
            return route.name === RouteNames.LoopEdit;
        }
        return false;
    }

    get routeParams() {
        const { route } = this.storeData.data.router;
        if (route) {
            return route.params;
        }
        return {};
    }

    connectedCallback() {
        appStore.dispatch(createProject('', new Tempo(128)))
        appStore.dispatch(createRouter());
        window.history.replaceState(history.state, '', window.location.pathname);
    }

    renderedCallback() {
        const { rect } = this;
        if (rect === null) {
            const boundingClientRect = this.getBoundingClientRect();
            this.rect = {
                x: boundingClientRect.left,
                y: boundingClientRect.top,
                width: boundingClientRect.width,
                height: boundingClientRect.height,
            };
        }
    }
}
