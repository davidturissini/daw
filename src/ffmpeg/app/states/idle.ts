import { BaseState } from './base';
import { appStore } from 'store/index';
import { setVirtualCursorTime, setCursorTime } from 'store/editor/action';
import { pixelToTime, absolutePixelToTime } from 'util/geometry';
import { navigate } from 'store/route/action';
import { RouteNames } from 'store/route';
import AppElement from 'cmp/app/app';

export class IdleState extends BaseState {
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

    /*
     *
     * Playback Control Events
     *
    */
    onPlayButtonClick() {

    }

    /*
     *
     * Toggle Mode Buttons
     *
    */
    onPerformanceModeButtonClick(evt: MouseEvent) {
        appStore.dispatch(
            navigate(RouteNames.ConcertMode, {}),
        )
    }
}
