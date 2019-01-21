import { BaseState } from './base';
import { IdleState } from './idle';
import {
    moveSegment,
} from './../../../wire/audiotracksegment';

export class SegmentDragState extends BaseState {
    onSegmentDrag(app, evt) {
        const { time, segmentId } = evt.detail;
        moveSegment(
            segmentId,
            time,
        );
    }

    onSegmentDragEnd(app) {
        requestAnimationFrame(() => {
            app.enterState(new IdleState());
        });
    }
}
