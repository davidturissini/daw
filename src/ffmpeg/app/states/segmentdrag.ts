import { BaseState } from './base';
import { IdleState } from './idle';
import { moveSegment } from 'store/audiosegment/action';
import { appStore } from 'store/index';

export class SegmentDragState extends BaseState {
    onSegmentDrag(app, evt) {
        const { time, segmentId } = evt.detail;
        appStore.dispatch(
            moveSegment(
                segmentId,
                time,
            )
        );
    }

    onSegmentDragEnd(app) {
        requestAnimationFrame(() => {
            app.enterState(new IdleState());
        });
    }
}
