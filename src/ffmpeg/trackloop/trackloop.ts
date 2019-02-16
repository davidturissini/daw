import { LightningElement, api, track, wire } from 'lwc';
import { Loop, LoopPlayState } from 'store/loop';
import { appStore, wireSymbol } from 'store/index';
import { playTrackLoop, stopLoop } from 'store/player/action';
import { getAudioContext } from 'util/sound';
import { navigate } from 'store/route/action';
import { RouteNames } from 'store/route';
import { ProjectState } from 'store/project/reducer';

export default class TrackLoopElement<T extends string> extends LightningElement {
    @api loop: Loop;
    @api instrumentId: string;
    @track isLoopEditRouteActive: boolean = false;

    @wire(wireSymbol, {
        paths: {
            project: ['project']
        }
    })
    storeData: {
        data: {
            project: ProjectState;
        }
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
                getAudioContext(),
                this.loop.id,
                this.instrumentId,
                this.storeData.data.project.currentProject!.tempo,
            )
        );
    }

    onLoopClick(evt: MouseEvent) {
        appStore.dispatch(
            navigate(RouteNames.LoopEdit, {
                loop_id: this.loop.id,
            })
        );
    }
}
