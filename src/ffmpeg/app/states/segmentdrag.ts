import { BaseState } from './base';
import { IdleState } from './idle';
import { moveSegment } from 'store/audiosegment/action';
import { appStore } from 'store/index';
import { RangeDragEvent, RangeDragEndEvent } from 'cmp/audiorange/audiorange';

export class SegmentDragState extends BaseState {
    segmentId: string;
    constructor(segmentId: string) {
        super();
        this.segmentId = segmentId;
    }

    onSegmentDrag(app, evt: RangeDragEvent) {
        const { segmentId } = this;
        const { time } = evt.detail;
        appStore.dispatch(
            moveSegment(
                segmentId,
                time,
            )
        );
    }

    onSegmentDragEnd(app, evt: RangeDragEndEvent) {
        requestAnimationFrame(() => {
            app.enterState(new IdleState());
        });
    }
}
