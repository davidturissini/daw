import { BaseState } from './base';
import { createAudioSegment, setAudioSegmentRange } from 'store/audiosegment/action';
import { appStore } from 'store/index';
import { generateId } from 'util/uniqueid';
import { AudioRange } from 'util/audiorange';
import { Time } from 'util/time';
import { IdleState } from './idle';
import { createAudioSource } from 'store/audiosource/action';
import { pixelToTime } from 'util/geometry';
import { AudioSegment } from 'store/audiosegment';
import { GridRowMouseDownEvent } from 'cmp/grid/grid';

export class SegmentDrawState extends BaseState {
    trackId: string | null = null;
    startTime: Time | null = null;
    segmentId: string | null = null;
    onAudioTrackMouseDown(app, evt: GridRowMouseDownEvent) {
        evt.preventDefault();
        const { rowId: trackId, time } = evt.detail;
        const segmentId = this.segmentId = generateId();
        const range = new AudioRange(time, new Time(0));
        const sourceId = generateId();
        appStore.dispatch(createAudioSource(sourceId))
        appStore.dispatch(createAudioSegment(segmentId, trackId, range, sourceId))
        this.startTime = time;
    }

    onAudioTrackMouseMove(app, evt: MouseEvent) {
        if (this.startTime && this.segmentId) {
            const { editor, audiosegment } = appStore.getState();
            const diff = evt.offsetX - this.startX;
            const segment = audiosegment.items.get(this.segmentId) as AudioSegment;
            const time = pixelToTime(editor.frame, editor.visibleRange, diff);
            const next = new AudioRange(segment.range.start, time);
            appStore.dispatch(setAudioSegmentRange(this.segmentId, next));
        }
    }

    onDocumentKeyUp(app, evt) {
        app.enterState(new IdleState());
    }
}
