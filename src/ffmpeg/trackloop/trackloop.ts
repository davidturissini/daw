import { LightningElement, api, track } from 'lwc';
import { Loop } from 'store/audiotrack';
import { appStore } from 'store/index';
import { playTrackLoop } from 'store/player/action';
import { audioContext } from 'util/sound';
import { navigate } from 'store/route/action';
import { RouteNames } from 'store/route';

export default class TrackLoopElement extends LightningElement {
    @api loop: Loop;
    @api trackId: string;
    @api instrumentId: string;
    @track isLoopEditRouteActive: boolean = false;

    onPlayButtonClick(evt: MouseEvent) {
        evt.stopPropagation();
        appStore.dispatch(
            playTrackLoop(audioContext, this.trackId, this.loop.id, this.instrumentId)
        );
    }

    onLoopClick(evt: MouseEvent) {
        appStore.dispatch(
            navigate(RouteNames.LoopEdit, {
                track_id: this.trackId,
                loop_id: this.loop.id,
            })
        );
    }
}
