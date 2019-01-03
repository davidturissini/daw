import { LightningElement, wire } from 'lwc';
import { editorSym } from './../../wire/editor';
import { audioTracks } from './../../wire/audiotrack';
import { audioSources } from './../../wire/audiosource';
import { playheadSym, play, stop, rasterize } from './../../wire/playhead';
import { Time } from './../../util/time';
import { AudioRange } from './../../util/audiorange';

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
        return this.playhead.data.currentTime !== null;
    }

    get displayTime() {
        return this.isPlaying ? this.playhead.data.currentTime : this.editor.data.cursor;
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
        play(this.editor.data.cursor)
        // rasterize(this.editor.data.cursor);
    }
}
