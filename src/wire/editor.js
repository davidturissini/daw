import { register } from 'wire-service';
import { AudioRange } from './../util/audiorange';
import { Time, gt } from './../util/time';
import { wireObservable } from './../util/wire-observable';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Record } from 'immutable';
import { stream as audioTrackStream, getTracksDuration } from './audiotrack';
class Editor extends Record({
    visibleRange: new AudioRange(
        new Time(0),
        Time.fromSeconds(10)
    ),
    end: Time.fromSeconds(30),
    frame: null,
    cursor: Time.fromSeconds(1),
    virtualCursor: Time.fromSeconds(2),
    quanitization: 1 / 4
}) {
    get duration() {
        return new Time(this.end.milliseconds - this.cursor.milliseconds);
    }

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
    console.log('ok', time.milliseconds)
    editorSubject.next(
        editorSubject.value.set('cursor', time)
    );
}

const quanitizationValues = [
    1 / 64,
    1 / 32,
    1 / 16,
    1 / 8,
    1 / 4,
    1 / 2,
    1,
    2,
    4,
    5,
    10,
    30,
    60,
    120,
    240,
];

export function setVisibleRange(start, duration) {
    const range = new AudioRange(start, duration);
    let next = editorSubject.value.set('visibleRange', range);

    const max = 40;
    let value = null;
    for(let i = 0; i < quanitizationValues.length; i += 1) {
        const ticks = duration.seconds / quanitizationValues[i];
        if (ticks <= max) {
            value = quanitizationValues[i];
            break;
        }
    }
    if (value === null) {
        value = quanitizationValues[quanitizationValues.length - 1];
    }
    next = next.set('quanitization', value);
    editorSubject.next(next);
}

export function setVisibleRangeStart(time) {
    setVisibleRange(time, editorSubject.value.visibleRange.duration);
}

export function setVisibleRangeDuration(time) {
    setVisibleRange(editorSubject.value.visibleRange.start, time);
}

export function incrementVisibleRangeStart(incrementTime) {
    const editor = editorSubject.value;
    const time = new Time(incrementTime.milliseconds + editor.visibleRange.start.milliseconds);
    setVisibleRangeStart(time);
}

export function incrementVisibleRangeDuration(incrementTime) {
    const editor = editorSubject.value;
    const duration = new Time(incrementTime.milliseconds + editor.visibleRange.duration.milliseconds);
    setVisibleRange(editor.visibleRange.start, duration);
}

export function incrementEnd(incrementTime) {
    const editor = editorSubject.value;
    const time = new Time(incrementTime.milliseconds + editor.end.milliseconds);
    editorSubject.next(
        editorSubject.value.set('end', time)
    );
}

export function setFrame(frame) {
    editorSubject.next(
        editorSubject.value.set('frame', frame)
    );
}


const editorSubject = new BehaviorSubject(new Editor());
export const stream = editorSubject.asObservable();

audioTrackStream.subscribe((audioTracks) => {
    if (audioTracks.size === 0) {
        return;
    }
    const tracksDuration = getTracksDuration(audioTracks);
    if (gt(tracksDuration, editorSubject.value.end)) {
        editorSubject.next(
            editorSubject.value.set('end', tracksDuration)
        );
    }
});

export const editorSym = Symbol();

register(editorSym, wireObservable(stream));
