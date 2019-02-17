import { LightningElement, wire, track } from 'lwc';
import { wireSymbol } from 'store/index';
import { generateId } from 'util/uniqueid';
import { CreateLoopEvent } from 'cmp/trackloops/trackloops';
import { RouteNames } from 'store/route';
import { RouterState } from 'store/route/reducer';
import { Frame } from 'util/geometry';
import { InstrumentState } from 'store/instrument/reducer';

export default class JamElement extends LightningElement {
    @track frame: Frame | null = null;
    @wire(wireSymbol, {
        paths: {
            instruments: ['instrument', 'items'],
            router: ['router']
        }
    })
    storeData: {
        data: {
            instruments: InstrumentState['items'];
            router: RouterState;
        }
    }

    get instruments() {
        return this.storeData.data.instruments.toList().toArray();
    }

    /*
     *
     * Track Loop Events
     *
     */
    onCreateTrackLoop(evt: CreateLoopEvent) {
        const loopId = generateId();

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

    get isInstrumentEditRouteActive(): boolean {
        const { route } = this.storeData.data.router;
        if (route) {
            return route.name === RouteNames.InstrumentEdit;
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

    get hasFrame() {
        return this.frame !== null;
    }

    renderedCallback() {
        if (!this.frame) {
            requestAnimationFrame(() => {
                const host = this.template.host! as HTMLElement;
                const rect = host.getBoundingClientRect();
                const frame: Frame = {
                    height: rect.height,
                    width: rect.width,
                };
                this.frame = frame;
            });
        }
    }
}
