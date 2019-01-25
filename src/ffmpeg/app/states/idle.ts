import { TimelineDragState } from './timelinedrag';
import { BaseState } from './base';
import { MetaKeyDownState } from './metakeydown';
import { SegmentDragState } from './segmentdrag';
import { EditorDragState } from './editordrag';
import { PlayingState } from './playing';
import { AudioRange } from '../../../util/audiorange';
import { appStore } from 'store/index';
import { setVirtualCursorTime, setCursorTime } from 'store/editor/action';
import { pixelToTime, absolutePixelToTime } from 'util/geometry';
import { navigate } from 'store/route/action';
import { RouteNames, SegmentEditRouteParams } from 'store/route';
import { RangeDragStartEvent, RangeSourceOffsetChangeEvent, RangeDoubleClickEvent, RangeDurationChangeEvent } from 'cmp/audiorange/audiorange';
import AppElement from 'cmp/app/app';

export class IdleState extends BaseState {
    onDocumentKeyDown(app: AppElement, evt) {
        if (evt.key === 'Meta') {
            app.enterState(new MetaKeyDownState());
        }
    }

    onTimelineDragStart(app: AppElement) {
        app.enterState(new TimelineDragState());
    }

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

    onEditorDragOver(app: AppElement, evt) {
        evt.preventDefault();
        app.enterState(new EditorDragState())
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

    onPlayButtonClick(app, evt) {
        const { editor } = appStore.getState();
        const range = new AudioRange(editor.cursor, editor.duration);
        app.enterState(new PlayingState(range));
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
}
