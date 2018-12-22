import { LightningElement, wire, track } from 'lwc';
import { getFFMPEG } from './../../wire/ffmpeg';
import { audioTracks as audioTracksWire, fetchAudioTrack } from './../../wire/audiotracks';
import { editorSym, setFrame as setEditorFrame, setVirtualCursorTime, setCursorTime } from './../../wire/editor';
import { Time } from '../../util/time';

export default class App extends LightningElement {
    frame = null;
    /*
     *
     * FFMPEG
     *
    */
    @wire(getFFMPEG, {})
    ffmpeg;

    get ffmpegLoaded() {
        return this.ffmpeg.data !== undefined;
    }

    /*
     *
     * Audio Tracks
     *
    */
    @track audioTracks = {};
    @wire(audioTracksWire, {})
    foo({ data }) {
        this.audioTracks = data;
    }

    get audioTracksArray() {
        return Object.values(this.audioTracks);
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

    onClick = (evt) => {
        const { offsetX } = evt;
        const time = this.editor.data.pixelToTime(offsetX - this.editor.data.frame.left);
        const next = new Time(time.milliseconds + this.editor.data.visibleRange.start.milliseconds);
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

    /*
     *
     * Template
     *
    */
    get hasVirtualCursor() {
        return this.editor && this.editor.data.virtualCursor !== null;
    }

    get cursorInWindow() {
        if(this.editor) {
            const { cursor, visibleRange } = this.editor.data;
            const { milliseconds: cursorMilliseconds } = cursor;
            const startMilliseconds = visibleRange.start.milliseconds;
            const endMilliseconds = startMilliseconds + visibleRange.duration.milliseconds;
            return (
                cursorMilliseconds >= startMilliseconds &&
                cursorMilliseconds <= endMilliseconds
            );
        }

        return false;
    }

    /*
     *
     * Lifecycle
     *
    */
    connectedCallback() {
        fetchAudioTrack(
            'mousetalgia',
            'Mousetalgia',
            'https://cdn.glitch.com/1c5226ac-9c37-4921-82e8-3b70672e4d46%2Fmousetalgia.mp3?154533585688'
        );

        window.addEventListener('resize', this.updateFrame);
        this.addEventListener('mousemove', this.onMouseMove);
        this.addEventListener('mouseleave', this.onMouseLeave);
        this.addEventListener('click', this.onClick);
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
        this.removeEventListener('click', this.onClick);
    }
}
