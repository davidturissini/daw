import { BaseState } from './base';
import { IdleState } from './idle';
import { timeZero } from '../../../util/time';
import { appStore } from 'store/index';
import { pixelToTime } from 'util/geometry';
import { setAudioWindowVisibleRange } from 'store/audiowindow/action';
import { AudioRange } from 'util/audiorange';

import { TimelineDragEvent } from './../../grid/grid';
import { AudioWindow } from 'store/audiowindow';

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

    onTimelineDrag(app, evt: TimelineDragEvent) {
        const { windowId } = evt.detail;
        const { audiowindow } = appStore.getState();
        const win = audiowindow.items.get(windowId) as AudioWindow;
        const time = pixelToTime(win.frame, win.visibleRange, evt.detail.dx);
        let start = win.visibleRange.start.minus(time);
        if (start.milliseconds < 0) {
            start = timeZero;
        }
        const range = new AudioRange(start, win.visibleRange.duration);
        appStore.dispatch(setAudioWindowVisibleRange(windowId, range));
    }
}
