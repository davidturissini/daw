import { LightningElement, wire } from 'lwc';
import { wireSymbol, appStore } from 'store/index';
import { AudioTrackState } from 'store/audiotrack/reducer';
import { createTrackLoop } from 'store/audiotrack/action';
import { generateId } from 'util/uniqueid';
import { CreateTrackLoopEvent } from 'cmp/trackloops/trackloops';
import { RouteNames } from 'store/route';
import { RouterState } from 'store/route/reducer';

export default class JamElement extends LightningElement {
    @wire(wireSymbol, {
        paths: {
            audiotracks: ['audiotrack', 'items'],
            router: ['router']
        }
    })
    storeData: {
        data: {
            audiotracks: AudioTrackState['items'];
            router: RouterState;
        }
    }

    get audioTracks() {
        return this.storeData.data.audiotracks.toList().toArray();
    }

    /*
     *
     * Track Loop Events
     *
     */
    onCreateTrackLoop(evt: CreateTrackLoopEvent) {
        const loopId = generateId();
        appStore.dispatch(
            createTrackLoop(evt.detail.trackId, loopId)
        )
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
            return route.name === RouteNames.ConcertInstrumentEdit;
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
}
