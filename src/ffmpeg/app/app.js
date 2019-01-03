import { LightningElement, wire, track } from 'lwc';
import { editorSym, incrementEnd, setFrame as setEditorFrame, setVirtualCursorTime, setCursorTime } from './../../wire/editor';
import { Time } from '../../util/time';
import { fromEvent as observableFromEvent } from 'rxjs';
import { takeUntil,filter, take, switchMap, flatMap, map } from 'rxjs/operators';
import {
    audioTracks,
    createTrackAndSourceFile,
    deleteTrack,
    setSegmentSelection,
    deleteSelections,
    getTracksDuration,
    segmentInTimeRange,
} from './../../wire/audiotrack';
import { generateId } from './../../util/uniqueid';
import { playheadSym, incrementPlaybackDuration, setPlaybackDuration } from './../../wire/playhead';
import { AudioRange, clamp as clampAudioRange } from './../../util/audiorange';

function userSelection(elm) {
    const selectionFrame = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    };

    const rect = elm.getBoundingClientRect();
    const offsetX = rect.x;
    const offsetY = rect.y;

    return observableFromEvent(elm, 'mousedown')
        .pipe(
            take(1)
        )
        .pipe(
            flatMap((evt) => {
                selectionFrame.left = evt.offsetX;
                selectionFrame.top = evt.offsetY;

                return observableFromEvent(elm, 'mousemove')
                    .pipe(
                        map((evt) => {
                            selectionFrame.width = (evt.x - offsetX) - selectionFrame.left;
                            selectionFrame.height = (evt.y - offsetY) - selectionFrame.top;
                            const frame = { ...selectionFrame };

                            if (frame.height < 0) {
                                frame.top += frame.height;
                                frame.height = -frame.height;
                            }

                            if (frame.width < 0) {
                                frame.left += frame.width;
                                frame.width = -frame.width;
                            }
                            return frame;
                        })
                    )
                    .pipe(
                        takeUntil(observableFromEvent(document, 'mouseup'))
                    )
            })
        )

}

export default class App extends LightningElement {
    frame = null;

    get ffmpegLoaded() {
        return this.ffmpeg.data !== undefined;
    }

    /*
     *
     * Audio Tracks
     *
    */
    @wire(audioTracks, {})
    audioTracks;

    get audioTracksArray() {
        return this.audioTracks.data.toList().toArray()
            .map((track, index) => {
                return {
                    index: index + 1,
                    data: track,
                };
            })
    }

    onTrackSummaryKeyUp(evt) {
        if (evt.which === 8) {
            const trackId = evt.target.getAttribute('data-track-id');
            deleteTrack(trackId);
        }
    }

    /*
     *
     * Editor
     *
    */
    @wire(editorSym, {})
    editor;

    /*
     *
     * Playhead
     *
    */
    @wire(playheadSym, {})
    playhead;

    /*
     *
     * Frame
     *
    */
    updateFrame = () => {
        const rect = this.template.querySelector('.editor-container').getBoundingClientRect();
        this.frame = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
        };
        setEditorFrame({
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
        });
    }

    /*
     *
     * Events
     *
    */
    segmentDrag = false;
    onSegmentDragStart() {
        this.segmentDrag = true;
    }

    onSegmentDragEnd() {
        requestAnimationFrame(() => {
            this.segmentDrag = false;
        });
    }

    onEditorMouseMove = (evt) => {
        const { offsetX } = evt;
        const time = this.editor.data.pixelToTime(offsetX);
        const next = new Time(time.milliseconds + this.editor.data.visibleRange.start.milliseconds);
        setVirtualCursorTime(next);
    }

    onEditorMouseLeave = (evt) => {
        setVirtualCursorTime(null);
    }

    onEditorClick = (evt) => {
        if (this.segmentDrag) {
            return;
        }
        const next = this.editor.data.absolutePixelToTime(evt.offsetX);
        setCursorTime(next);
    }

    onTimelineDragStart() {
        this.template.host.classList.add('editor--drag');
    }

    onTimelineDragEnd() {
        this.template.host.classList.remove('editor--drag');
    }

    onDragOver = (evt) => {
        evt.preventDefault();
        const { offsetX } = evt;
        const time = this.editor.data.pixelToTime(offsetX - this.editor.data.frame.left);
        const next = new Time(time.milliseconds + this.editor.data.visibleRange.start.milliseconds);
        setVirtualCursorTime(next);
    }

    onDrop = (evt) => {
        evt.preventDefault();
        const { files } = evt.dataTransfer;
        for(let i = 0, len = files.length; i < len; i += 1) {
            const sourceId = generateId();
            const trackId = generateId();
            const time = this.editor.data.absolutePixelToTime(evt.offsetX - this.editor.data.frame.left);
            createTrackAndSourceFile(
                trackId,
                sourceId,
                files[i],
                time,
            );
        }
    }

    onTimelineMouseEnter = () => {
        this.template.host.classList.add('editor--draggable');
    }

    onTimelineMouseLeave = () => {
        this.template.host.classList.remove('editor--draggable');
    }

    onPlaybackDurationCursorDrag(evt) {
        const { dx } = evt.detail;
        const time = this.editor.data.pixelToTime(dx);
        incrementPlaybackDuration(time);
    }

    onPlaybackDurationCursorDoubleTap(evt) {
        const duration = getTracksDuration(this.audioTracks.data);
        if (duration.greaterThan(this.playhead.data.playbackRange.duration)) {
            setPlaybackDuration(duration);
        }
    }

    /*
     *
     * Template
     *
    */
    get hasVirtualCursor() {
        return (
            this.editor && this.editor.data.virtualCursor !== null &&
            this.timeInWindow(this.editor.data.virtualCursor)
        );
    }

    get hasPlaybackCursor() {
        return this.playhead.data.currentTime !== null;
    }

    get hasPlaybackDurationCursor() {
        return this.timeInWindow(this.playhead.data.playbackRange.duration);
    }

    timeInWindow(time) {
        if(this.editor) {
            const { visibleRange } = this.editor.data;
            const { milliseconds: timeMilliseconds } = time;
            const startMilliseconds = visibleRange.start.milliseconds;
            const endMilliseconds = startMilliseconds + visibleRange.duration.milliseconds;
            return (
                timeMilliseconds >= startMilliseconds &&
                timeMilliseconds <= endMilliseconds
            );
        }

        return false;
    }

    get cursorInWindow() {
        if(this.editor) {
            const { cursor } = this.editor.data;
            return this.timeInWindow(cursor);
        }

        return false;
    }

    handleEditorEndDrag(evt) {
        const time = this.editor.data.pixelToTime(evt.detail.dx);
        incrementEnd(time);
    }

    /*
     *
     * Selection
     *
    */
    @track selectionFrame = null;

    get isSelecting() {
        return this.selectionFrame !== null;
    }

    get editorClassName() {
        if (this.selectionFrame) {
            return 'editor editor--selecting';
        }
        return 'editor';
    }

    selectionSubscription;
    listenForSelection() {
        this.selectionSubscription = observableFromEvent(document, 'keydown')
            .pipe(filter((evt) => evt.key === 'Meta'))
            .pipe(take(1))
            .pipe(
                switchMap(() => {
                    return userSelection(this.template.querySelector('.editor'));
                })
            )
            .subscribe((frame) => {
                this.selectionFrame = frame;
            }, null, () => {
                const frame = this.selectionFrame;
                const startTime = this.editor.data.absolutePixelToTime(frame.left);
                const duration = this.editor.data.pixelToTime(frame.width);
                const range = new AudioRange(startTime, duration);
                const frameBottom = frame.top + frame.height;
                this.audioTracks.data.filter((audioTrack) => {
                    const { frame: audioTrackFrame } = audioTrack;
                    const bottom = audioTrackFrame.top + audioTrackFrame.height;
                    const midHeight = audioTrackFrame.height / 2;
                    return (
                        frame.top <= (audioTrackFrame.top + midHeight) &&
                        frameBottom >= (bottom - midHeight)
                    );
                })
                .forEach((audioTrack) => {
                    audioTrack.segments.filter((segment) => {
                        return segmentInTimeRange(
                            segment,
                            range.start,
                            range.duration,
                        );
                    })
                    .forEach((segment) => {
                        const clamped = clampAudioRange(
                            new AudioRange(segment.offset, segment.duration),
                            range,
                        );

                        setSegmentSelection(audioTrack.id, segment.id, clamped);
                    })
                });


                this.selectionFrame = null;
                this.listenForSelection();
            })
    }

    /*
     *
     * Lifecycle
     *
    */
    connectedCallback() {
        window.addEventListener('resize', this.updateFrame);

        document.addEventListener('keyup', (evt) => {
            if (evt.which === 8) {
                deleteSelections();
            }
        })

        this.addEventListener('dragover', this.onDragOver);
        this.addEventListener('drop', this.onDrop);
        this.listenForSelection();

    }

    renderedCallback() {
        if (this.frame === null) {
            this.updateFrame();
        }
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.updateFrame);
        if (this.selectionSubscription) {
            this.selectionSubscription.unsubscribe();
        }
    }
}
