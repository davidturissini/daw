import { LightningElement, wire, track } from 'lwc';
import interact from 'interactjs';
import { Time, sum as sumTime, invert as invertTime } from './../../util/time';
import {
    editorSym,
    setVisibleRangeStart,
    setVisibleRangeDuration,
    setVisibleRange,
} from './../../wire/editor';
import { audioTracks, audioTrackRange } from './../../wire/audiotrack';
import { playheadSym } from './../../wire/playhead';
import rafThrottle from 'raf-throttle';

function pixelToTime(frame, duration, pixel) {
    const { width } = frame;
    const percent = (pixel / width);

    const millisecond = percent * duration.milliseconds;
    return new Time(millisecond);
}

function timeToPixel(frame, visibleRange, time) {
    const { width } = frame;
    const percent = (time.milliseconds - visibleRange.start.milliseconds) / visibleRange.duration.milliseconds;

    return percent * width;
}

function durationToWidth(frame, duration, time) {
    const { width } = frame;
    const pixelsPerMillisecond = width / duration.milliseconds;

    return pixelsPerMillisecond * time.milliseconds
}

export default class AudioScroll extends LightningElement {
    @wire(audioTracks, {})
    audioTracks

    @wire(editorSym, {})
    editor;

    @wire(playheadSym, {})
    playhead;

    get tracks() {
        const { frame } = this;
        return this.audioTracks.data.toList().filter((track) => {
            return audioTrackRange(track);
        })
        .map((track) => {
            const trackRange = audioTrackRange(track);
            const color = track.color.rgb();
            const width = durationToWidth(frame, this.maxTime, trackRange.duration);
            const x = timeToPixel(frame, {
                start: this.minTime,
                duration: this.maxTime,
            }, trackRange.start);
            return {
                id: track.id,
                style: `background: ${color}; width: ${width}px; transform: translate(${x}px)`
            }
        })
    }

    /*
     *
     * Frame
     *
    */
    @track frame = null;
    updateFrame = () => {
        const rect = this.template.host.getBoundingClientRect();
        this.frame = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
        };
    }

    /*
     *
     * Window
     *
    */
    get maxTime() {
        return this.playhead.data.playbackRange.duration.add(new Time(5000));
    }

    get minTime() {
        return new Time(0);
    }

    get windowStyle() {
        if (!this.frame) {
            return '';
        }
        const range = {
            start: this.minTime,
            duration: this.maxTime,
        };
        const px = timeToPixel(this.frame, range, this.editor.data.visibleRange.start);
        const translate = `translateX(${px}px)`;
        let timeWidth = this.editor.data.visibleRange.duration
        if (this.editor.data.visibleRange.start.add(this.editor.data.visibleRange.duration).greaterThan(this.maxTime)) {
            timeWidth = this.maxTime.subtract(this.editor.data.visibleRange.start);
        }
        const width = durationToWidth(this.frame, range.duration, timeWidth);
        return `width: ${width}px; transform: ${translate}`
    }

    onWindowDrag = rafThrottle((evt) => {
        const { maxTime, editor, frame } = this;
        const time = pixelToTime(frame, maxTime, evt.dx);
        let nextTime = sumTime(time, editor.data.visibleRange.start);
        if (nextTime.milliseconds < 0) {
            nextTime = new Time(0);
        } else if (nextTime.milliseconds > maxTime.milliseconds - editor.data.visibleRange.duration.milliseconds) {
            nextTime = new Time(maxTime.milliseconds - editor.data.visibleRange.duration.milliseconds);
        }

        setVisibleRangeStart(nextTime)
    });

    onEndHandleDrag = rafThrottle((evt) => {
        const { frame, maxTime, editor } = this;
        const time = pixelToTime(frame, maxTime, evt.dx);
        let nextDuration = sumTime(time, editor.data.visibleRange.duration);

        if (nextDuration.milliseconds + editor.data.visibleRange.start.milliseconds > this.maxTime.milliseconds) {
            nextDuration = new Time(this.maxTime.milliseconds - editor.data.visibleRange.start.milliseconds);
        };
        setVisibleRangeDuration(nextDuration);
    });

    onStartHandleDrag = rafThrottle((evt) => {
        const { maxTime, editor, frame } = this;
        let diff = pixelToTime(frame, maxTime, evt.dx);
        let nextStart = sumTime(editor.data.visibleRange.start, diff);

        if (nextStart.milliseconds < 0) {
            diff = invertTime(editor.data.visibleRange.start);
            nextStart = new Time(0);
        }
        const nextDuration = sumTime(editor.data.visibleRange.duration, invertTime(diff));
        setVisibleRange(nextStart, nextDuration);
    });

    /*
     *
     * Lifecycle
     *
    */
    renderedCallback() {
        if (this.frame === null) {
            this.updateFrame();
            interact(this.template.querySelector('.window')).draggable({
                onmove: this.onWindowDrag
            })

            interact(this.template.querySelector('.handle--end')).draggable({
                onmove: this.onEndHandleDrag
            });

            interact(this.template.querySelector('.handle--start')).draggable({
                onmove: this.onStartHandleDrag
            });
        }
    }
}
