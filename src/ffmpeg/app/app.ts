import { LightningElement, wire, track } from 'lwc';
import { wireSymbol, appStore } from 'store/index';
import { createRouter } from 'store/route/action';
import { RouterState } from 'store/route/reducer';
import { RouteNames, routeIsActive } from 'store/route';
import { ProjectState } from 'store/project/reducer';
import { Time } from 'util/time';
import { Frame } from 'util/geometry';
import { createProject } from 'store/project/action';
import { Tempo } from 'store/project';

export default class AppElement extends LightningElement {
    @track cursor: Time | null = null;
    @track mainFrame: Frame | null = null;

    @wire(wireSymbol, {
        paths: {
            route: ['router', 'route'],
            project: ['project'],
        }
    })
    storeData: {
        data: {
            route: RouterState['route'];
            project: ProjectState;
        }
    }

    get route() {
        return this.storeData.data.route;
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

    connectedCallback() {
        appStore.dispatch(createProject('', new Tempo(128)))
        appStore.dispatch(createRouter());
        window.history.replaceState(history.state, '', window.location.pathname);
    }
}
