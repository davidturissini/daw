import { LightningElement, wire } from 'lwc';
import { editorSym } from './../../wire/editor';
import { audioTracks } from './../../wire/audiotrack';
import { audioSources } from './../../wire/audiosource';
import { playheadSym, play, stop } from './../../wire/playhead';
import { Time } from './../../util/time';

export default class Controls extends LightningElement {
    @wire(editorSym, {})
    editor;

    @wire(audioTracks, {})
    audioTracks

    @wire(audioSources, {})
    audioSources

    @wire(playheadSym, {})
    playhead

    get isPlaying() {
        return this.playhead.data.playbackTime !== null;
    }

    get displayTime() {
        return this.isPlaying ? this.playhead.data.playbackTime : this.editor.data.cursor;
    }

    get playButtonClass() {
        const base = `control`;

        if (this.isPlaying) {
            return `${base} control--playing`;
        }

        return base;
    }

    get stopButtonClass() {
        return 'control';
    }

    onStopClick() {
        stop();
    }

    onPlayClick() {
        play(
            this.editor.data.cursor,
            this.editor.data.duration,
        );
    }
}
