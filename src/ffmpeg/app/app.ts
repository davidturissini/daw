import { LightningElement, wire, track } from 'lwc';
import { wireSymbol, appStore } from 'store/index';
import { createRouter, navigate } from 'store/route/action';
import { RouterState } from 'store/route/reducer';
import { RouteNames } from 'store/route';
import { ProjectState } from 'store/project/reducer';
import { Time } from 'util/time';
import { Rect } from 'util/geometry';
import { createProject } from 'store/project/action';
import { Tempo } from 'store/project';
import { LoopState } from 'store/loop/reducer';
import { DeleteInstrumentEvent } from 'event/deleteinstrumentevent';
import { deleteInstrument } from 'store/instrument/action';
import { InstrumentState } from 'store/instrument/reducer';
import { Instrument } from 'store/instrument';

export default class AppElement extends LightningElement {
    @track cursor: Time | null = null;
    @track rect: Rect | null = null;

    @wire(wireSymbol, {
        paths: {
            router: ['router'],
            project: ['project'],
            loops: ['loop', 'items'],
            instruments: ['instrument', 'items'],
        }
    })
    storeData: {
        data: {
            router: RouterState;
            project: ProjectState;
            loops: LoopState['items'];
            instruments: InstrumentState['items'];
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
    get isLoopEditRouteActive(): boolean {
        const { route } = this.storeData.data.router;
        if (route) {
            return route.name === RouteNames.LoopEdit;
        }
        return false;
    }

    get isInstrumentEditRouteActive() {
        const { route } = this.storeData.data.router;
        if (route) {
            return route.name === RouteNames.InstrumentEdit || this.isLoopEditRouteActive;
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

    get routeParamsInstrumentId() {
        if (this.isInstrumentEditRouteActive) {
            const { routeParams } = this;
            return routeParams.instrument_id;
        }
        return null;
    }

    /*
     *
     * Events
     *
    */
    onDeleteInstrument(evt: DeleteInstrumentEvent) {
        const { instrumentId } = evt.detail;
        const instrument = this.storeData.data.instruments.get(instrumentId) as Instrument<any>;
        if (this.isInstrumentEditRouteActive) {
            appStore.dispatch(
                navigate(RouteNames.ConcertMode, {})
            );
        }
        appStore.dispatch(
            deleteInstrument(instrumentId, instrument.loops)
        );
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
