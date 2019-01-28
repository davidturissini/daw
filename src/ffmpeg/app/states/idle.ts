import { BaseState } from './base';
import { SegmentDragState } from './segmentdrag';
import { AudioRange } from '../../../util/audiorange';
import { appStore } from 'store/index';
import { setVirtualCursorTime, setCursorTime } from 'store/editor/action';
import { pixelToTime, absolutePixelToTime } from 'util/geometry';
import { navigate } from 'store/route/action';
import { RouteNames, SegmentEditRouteParams } from 'store/route';
import { RangeDragStartEvent, RangeSourceOffsetChangeEvent, RangeDoubleClickEvent, RangeDurationChangeEvent } from 'cmp/audiorange/audiorange';
import AppElement from 'cmp/app/app';
import { startPlayback } from 'store/player/action';
import { timeZero, Time } from 'util/time';
import { audioContext } from 'util/sound';

export class IdleState extends BaseState {
    onSegmentDragStart(app: AppElement, evt: RangeDragStartEvent) {
        const { itemId: segmentId } = evt.detail;
        app.enterState(new SegmentDragState(segmentId));
    }

    onSegmentSourceOffsetChange(app: AppElement, evt: RangeSourceOffsetChangeEvent) {
        throw new Error('not implemented')
    }

    onEditorMouseMove(app: AppElement, evt) {
        const { editor } = appStore.getState()
        const { offsetX } = evt;
        const time = pixelToTime(editor.frame, editor.visibleRange, offsetX);
        const next = time.add(editor.visibleRange.start);
        appStore.dispatch(setVirtualCursorTime(next));
    }

    onEditorMouseLeave(app: AppElement, evt) {
        appStore.dispatch(setVirtualCursorTime(null));
    }

    onSegmentDurationChange(app: AppElement, evt: RangeDurationChangeEvent) {
        throw new Error('not implemented')
    }

    onEditorClick(app: AppElement, evt) {
        const { editor } = appStore.getState();
        const next = absolutePixelToTime(editor.frame, editor.visibleRange, evt.offsetX);
        appStore.dispatch(setCursorTime(next));
    }

    onTimelineMouseEnter(app, evt) {
        app.template.host.classList.add('editor--draggable');
    }

    onTimelineMouseLeave(app, evt) {
        app.template.host.classList.remove('editor--draggable');
    }

    onPlaybackDurationCursorDoubleTap(app, evt) {
        throw new Error('not implemented')
    }

    onPlaybackDurationCursorDrag(app, evt) {
        throw new Error('not implemented')
    }

    onSilenceDetectButtonClick(app, evt) {
        throw new Error('not implemented')
    }

    onSegmentDoubleClick(app, evt: RangeDoubleClickEvent) {
        const { id: segmentId } = evt.detail;
        const path = `/segments/${segmentId}/edit`;
        appStore.dispatch(
            navigate<SegmentEditRouteParams>(RouteNames.SegmentEdit, {
                segment_id: segmentId,
            })
        )
        window.history.pushState({}, '', path);
    }

    /*
     *
     * Playback Control Events
     *
    */
    onPlayButtonClick() {
        appStore.dispatch(
            startPlayback(audioContext, new AudioRange(timeZero, Time.fromSeconds(10)), false)
        )
    }
}
