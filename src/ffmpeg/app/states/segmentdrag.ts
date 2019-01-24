import { BaseState } from './base';
import { IdleState } from './idle';
import { moveSegment } from 'store/audiosegment/action';
import { appStore } from 'store/index';

export class SegmentDragState extends BaseState {
    segmentId: string;
    constructor(segmentId: string) {
        super();
        this.segmentId = segmentId;
    }

    onSegmentDrag(app, evt) {
        const { segmentId } = this;
        const { time } = evt.detail;
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
