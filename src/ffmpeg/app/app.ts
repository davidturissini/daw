import { LightningElement, wire } from 'lwc';
import { editorSym, incrementEnd, setFrame as setEditorFrame, setVirtualCursorTime } from '../../wire/editor';
import { fromEvent as observableFromEvent } from 'rxjs';
import {
    audioTracks,
    deleteTrack,
} from '../../wire/audiotrack';
import { playheadSym } from '../../wire/playhead';
import { highlightSym } from '../../wire/highlight';
import { IdleState } from './states/idle';
import { BaseState } from './states/base';

export default class App extends LightningElement {
    state: BaseState;
    template: ShadowRoot;
    constructor() {
        super();
        this.enterState(new IdleState());
    }

    enterState(next: BaseState) {
        if (this.state) {
            this.state.exit();
        }
        this.state = next;
        this.state.enter();
    }

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
     * Highlights
     *
    */
    @wire(highlightSym, {})
    highlightData;

    get highlights() {
        return this.highlightData.data.items.toList().toArray();
    }

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
    onSegmentDragStart() {
        this.state.onSegmentDragStart(this);
    }

    onSegmentDragEnd() {
        this.state.onSegmentDragEnd(this);
    }

    onSegmentDrag(evt) {
        this.state.onSegmentDrag(this, evt);
    }

    onSegmentSourceOffsetChange(evt) {
        this.state.onSegmentSourceOffsetChange(this, evt);
    }

    onSegmentDurationChange(evt) {
        this.state.onSegmentDurationChange(this, evt);
    }

    onEditorMouseMove = (evt) => {
        this.state.onEditorMouseMove(this, evt);
    }

    onEditorMouseLeave = (evt) => {
        setVirtualCursorTime(null);
    }

    onEditorMouseDown(evt) {
        this.state.onEditorMouseDown(this, evt);
    }

    onEditorClick = (evt) => {
        this.state.onEditorClick(this, evt);
    }

    onTimelineDragStart() {
        this.state.onTimelineDragStart(this);
    }

    onTimelineDragEnd() {
        this.state.onTimelineDragEnd(this);
    }

    onTimelineDrag(evt) {
        this.state.onTimelineDrag(this, evt);
    }

    onDragOver = (evt) => {
        this.state.onEditorDragOver(this, evt);
    }

    onDrop = (evt) => {
        this.state.onEditorDrop(this, evt);
    }

    onTimelineMouseEnter = (evt) => {
        this.state.onTimelineMouseEnter(this, evt);
    }

    onTimelineMouseLeave = (evt) => {
        this.state.onTimelineMouseLeave(this, evt);
    }

    onPlaybackDurationCursorDrag(evt) {
       this.state.onPlaybackDurationCursorDrag(this, evt);
    }

    onPlaybackDurationCursorDoubleTap(evt) {
        this.state.onPlaybackDurationCursorDoubleTap(this, evt);
    }

    onPlayButtonClick(evt) {
        this.state.onPlayButtonClick(this, evt);
    }

    onSilenceDetectButtonClick(evt) {
        this.state.onSilenceDetectButtonClick(this, evt);

        // const range = getTracksRange(this.audioTracks.data);
        // highlightSilences(range);
    }

    onStopButtonClick(evt) {
        this.state.onStopButtonClick(this, evt);
    }

    onDocumentKeyUp = (evt) => {
        if (evt.which === 8) {
            this.state.onDocumentKeyUpEsc(this, evt);
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

    get editorElement() {
        return this.template.querySelector('.editor');
    }

    /*
     *
     * Lifecycle
     *
    */
    connectedCallback() {
        window.addEventListener('resize', this.updateFrame);
        document.addEventListener('keyup', this.onDocumentKeyUp);

        observableFromEvent(document, 'keydown').subscribe((evt) => {
            this.state.onDocumentKeyDown(this, evt);
        })

        observableFromEvent(document, 'mouseup').subscribe((evt) => {
            this.state.onDocumentMouseUp(this, evt);
        })

        this.addEventListener('dragover', this.onDragOver);
        this.addEventListener('drop', this.onDrop);
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
