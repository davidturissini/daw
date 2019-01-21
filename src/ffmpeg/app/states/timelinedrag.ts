import { BaseState } from './base';
import { IdleState } from './idle';
import { timeZero } from '../../../util/time';
import { appStore } from 'store/index';
import { pixelToTime } from 'util/geometry';
import { setVisibleRange } from 'store/editor/action';
import { AudioRange } from 'util/audiorange';

export class TimelineDragState extends BaseState {
    enter(app) {
        app.template.host.classList.add('editor--drag');
    }

    exit(app) {
        app.template.host.classList.remove('editor--drag');
    }

    onTimelineDragEnd(app) {
        app.enterState(new IdleState());
    }

    onTimelineDrag(app, evt) {
        const { editor } = appStore.getState();
        const time = pixelToTime(editor.frame, editor.visibleRange, evt.detail.dx);
        let start = editor.visibleRange.start.minus(time);
        if (start.milliseconds < 0) {
            start = timeZero;
        }
        const range = new AudioRange(start, editor.visibleRange.duration);
        appStore.dispatch(setVisibleRange(range));
    }
}
