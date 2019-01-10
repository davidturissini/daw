import { BaseState } from './base';
import { IdleState } from './idle';
import {
    moveSegment,
} from './../../../wire/audiotrack';

export class SegmentDragState extends BaseState {
    onSegmentDrag(app, evt) {
        const { time, segmentId, trackId } = evt.detail;
        moveSegment(
            trackId,
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
