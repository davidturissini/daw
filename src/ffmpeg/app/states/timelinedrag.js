import { BaseState } from './base';
import { IdleState } from './idle';
import { Time } from './../../../util/time';
import { setVisibleRangeStart, stream as editorStream } from './../../../wire/editor';
import { take } from 'rxjs/operators';

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
        editorStream.pipe(take(1)).subscribe((editor) => {
            const time = editor.pixelToTime(evt.detail.dx);
            const updated = editor.visibleRange.start.minus(time);
            if (updated.milliseconds < 0) {
                return setVisibleRangeStart(new Time(0));
            }
            setVisibleRangeStart(updated);
        });
    }
}
