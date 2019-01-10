import { LightningElement, wire } from 'lwc';
import { editorSym } from './../../wire/editor';
import { audioTracks, getTracksRange } from './../../wire/audiotrack';
import { audioSources } from './../../wire/audiosource';
import { playheadSym, play, stop } from './../../wire/playhead';
import { highlightSilences } from './../../wire/highlight';
import { AudioRange } from '../../util/audiorange';
import { Time } from '../../util/time';

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

    onSilenceDetectClick() {
        const range = getTracksRange(this.audioTracks.data);
        highlightSilences(range);
    }

    onStopClick() {
        const event = new CustomEvent('stopbuttonclick', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    onPlayClick() {
        const event = new CustomEvent('playbuttonclick', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
}
