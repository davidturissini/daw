import { LightningElement, wire } from 'lwc';
import { editorSym, setFrame as setEditorFrame, setVirtualCursorTime, setCursorTime } from './../../wire/editor';
import { Time } from '../../util/time';
import { audioTracks, createTrackAndSourceFile } from './../../wire/audiotrack';
import { generateId } from './../../util/uniqueid';
import { playheadSym } from './../../wire/playhead';

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
        return this.audioTracks.data.toList().toArray();
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
    onMouseMove = (evt) => {
        const { offsetX } = evt;
        const time = this.editor.data.pixelToTime(offsetX - this.editor.data.frame.left);
        const next = new Time(time.milliseconds + this.editor.data.visibleRange.start.milliseconds);
        setVirtualCursorTime(next);
    }

    onMouseLeave = (evt) => {
        setVirtualCursorTime(null);
    }

    handleEditorClick = (evt) => {
        const next = this.editor.data.absolutePixelToTime(evt.offsetX);
        setCursorTime(next);
    }

    onTimelineDragStart() {
        this.removeEventListener('click', this.onClick);
        this.template.host.classList.add('editor--drag');
    }

    onTimelineDragEnd() {
        this.addEventListener('click', () => {
            Promise.resolve().then(() => {
                this.addEventListener('click', this.onClick);
            });
        }, { once: true });
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
            const time = this.editor.data.pixelToTime(evt.offsetX - this.editor.data.frame.left);
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
        return this.playhead.data.playbackTime !== null;
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

    /*
     *
     * Lifecycle
     *
    */
    connectedCallback() {
        window.addEventListener('resize', this.updateFrame);
        this.addEventListener('mousemove', this.onMouseMove);
        this.addEventListener('mouseleave', this.onMouseLeave);

        this.draggable = true;
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
        this.removeEventListener('mousemove', this.onMouseMove);
        this.removeEventListener('mouseleave', this.onMouseLeave);
    }
}
