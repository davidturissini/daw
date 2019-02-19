import { LightningElement, api, track } from 'lwc';
import { Loop, LoopPlayState } from 'store/loop';
import { appStore } from 'store/index';
import { playTrackLoop, stopLoop } from 'store/player/action';
import { navigate } from 'store/route/action';
import { RouteNames } from 'store/route';
import { Color } from 'util/color';
import { Tempo } from 'store/project';

export default class TrackLoopElement extends LightningElement {
    @api loop: Loop;
    @api instrumentId: string;
    @api tempo: Tempo;
    @track isLoopEditRouteActive: boolean = false;

    get buttonColor() {
        return new Color(84, 84, 84);
    }

    get isPlaying() {
        return this.loop.playState === LoopPlayState.PLAYING;
    }

    get isStopped() {
        return this.loop.playState === LoopPlayState.STOPPED;
    }

    onStopButtonClick(evt: MouseEvent) {
        evt.stopPropagation();
        appStore.dispatch(
            stopLoop(this.loop.id)
        )
    }

    onPlayButtonClick(evt: MouseEvent) {
        evt.stopPropagation();
        appStore.dispatch(
            playTrackLoop(
                this.loop.id,
                this.instrumentId,
                this.tempo,
            )
        );
    }

    onLoopClick(evt: MouseEvent) {
        appStore.dispatch(
            navigate(RouteNames.LoopEdit, {
                instrument_id: this.instrumentId,
                loop_id: this.loop.id,
            })
        );
    }
}
