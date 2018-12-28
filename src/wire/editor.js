import { register } from 'wire-service';
import { AudioRange } from './../util/audiorange';
import { Time } from './../util/time';
import { wireObservable } from './../util/wire-observable';
import { BehaviorSubject } from 'rxjs';
import { Record } from 'immutable';
import { play, isPlaying } from './playhead';

class Editor extends Record({
    visibleRange: new AudioRange(
        new Time(0),
        Time.fromSeconds(10)
    ),
    duration: Time.fromSeconds(15),
    frame: null,
    cursor: Time.fromSeconds(1),
    virtualCursor: Time.fromSeconds(2),
    quanitization: 1 / 8
}) {
    pixelToTime(pixel) {
        const { width } = this.frame;
        const { visibleRange } = this;
        const percent = (pixel / width);

        const millisecond = percent * visibleRange.duration.milliseconds;
        return new Time(millisecond);
    }

    absolutePixelToTime(pixel) {
        const time = this.pixelToTime(pixel);
        return new Time(time.milliseconds + this.visibleRange.start.milliseconds);
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

export function setVirtualCursorTime(time) {
    editorSubject.next(
        editorSubject.value.set('virtualCursor', time)
    );
}

export function setCursorTime(time) {
    editorSubject.next(
        editorSubject.value.set('cursor', time)
    );
    if (isPlaying()) {
        play(time);
    }
}

export function setVisibleRange(start, duration) {
    const range = new AudioRange(start, duration);
    editorSubject.next(
        editorSubject.value.set('visibleRange', range)
    );
}

export function setVisibleRangeStart(time) {
    const editor = editorSubject.value;
    const range = new AudioRange(time, editor.visibleRange.duration);
    editorSubject.next(
        editorSubject.value.set('visibleRange', range)
    );
}

export function setVisibleRangeDuration(time) {
    const editor = editorSubject.value;
    const range = new AudioRange(editor.visibleRange.start, time);
    editorSubject.next(
        editorSubject.value.set('visibleRange', range)
    );
}

export function incrementVisibleRangeStart(incrementTime) {
    const editor = editorSubject.value;
    const time = new Time(incrementTime.milliseconds + editor.visibleRange.start.milliseconds);
    setVisibleRangeStart(time);
}

export function incrementVisibleRangeDuration(incrementTime) {
    const editor = editorSubject.value;
    const duration = new Time(incrementTime.milliseconds + editor.visibleRange.duration.milliseconds);
    const range = new AudioRange(editor.visibleRange.start, duration);
    editorSubject.next(
        editorSubject.value.set('visibleRange', range)
    );
}

export function setFrame(frame) {
    editorSubject.next(
        editorSubject.value.set('frame', frame)
    );
}

const editorSubject = new BehaviorSubject(new Editor());
export const stream = editorSubject.asObservable();
export const editorSym = Symbol();

register(editorSym, wireObservable(stream));
