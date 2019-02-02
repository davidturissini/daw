import { LightningElement, api, track, wire } from 'lwc';
import { Loop } from 'store/loop';
import { appStore, wireSymbol } from 'store/index';
import { playTrackLoop } from 'store/player/action';
import { getAudioContext } from 'util/sound';
import { navigate } from 'store/route/action';
import { RouteNames } from 'store/route';
import { ProjectState } from 'store/project/reducer';

export default class TrackLoopElement<T extends string> extends LightningElement {
    @api loop: Loop<T>;
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

    onPlayButtonClick(evt: MouseEvent) {
        evt.stopPropagation();
        appStore.dispatch(
            playTrackLoop(
                getAudioContext(),
                this.loop.id,
                this.instrumentId,
                this.storeData.data.project.tempo,
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
