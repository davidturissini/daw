import { register, ValueChangedEvent } from 'wire-service';
import { AudioRange } from './../util/audiorange';
import { Time } from './../util/time';

let wiredEventTargets = [];
let editor = null;

class Editor {
    visibleRange = new AudioRange(
        new Time(0),
        Time.fromSeconds(60 * 60)
    );
    frame = null;
    cursor = Time.fromSeconds(1);
    virtualCursor = Time.fromSeconds(2);

    pixelToTime(pixel) {
        const { width } = this.frame;
        const { visibleRange } = this;
        const percent = (pixel / width);

        const millisecond = percent * visibleRange.duration.milliseconds;
        return new Time(millisecond);
    }

    timeToPixel(time) {
        const { width } = this.frame;
        const { visibleRange } = this;
        const percent = (time.milliseconds - visibleRange.start.milliseconds) / visibleRange.duration.milliseconds;

        return percent * width;
    }

    durationToWidth(time) {
        const { width } = this.frame;
        const { visibleRange } = this;
        const pixelsPerMillisecond = width / visibleRange.duration.milliseconds;

        return pixelsPerMillisecond * time.milliseconds
    }

}

function set(key, value) {
    const next = new Editor();
    const keys = Object.keys(editor);
    keys.forEach((ownKey) => {
        if (ownKey === key) {
            return;
        }
        next[ownKey] = editor[ownKey];
    });
    next[key] = value;
    editor = next;

    dispatch();
}

function dispatch() {
    wiredEventTargets.forEach((eventTarget) => {
        eventTarget.dispatchEvent(
            new ValueChangedEvent({ data: editor })
        );
    });
}

export function setVirtualCursorTime(time) {
    set('virtualCursor', time);
}

export function setCursorTime(time) {
    set('cursor', time);
}

export function setVisibleRangeStart(time) {
    const range = new AudioRange(time, editor.visibleRange.duration);
    set('visibleRange', range);
}

export function setFrame(frame) {
    set('frame', frame);
}

export const editorSym = Symbol();

register(editorSym, function (eventTarget) {
    wiredEventTargets.push(eventTarget);
    if (editor === null) {
        editor = new Editor();
    }

    eventTarget.dispatchEvent(
        new ValueChangedEvent({ data: editor })
    );
});
