import { LightningElement, wire } from 'lwc';
import { editorSym } from '../../wire/editor';
import { audioSources } from '../../wire/audiosource';
import { playheadSym } from '../../wire/playhead';

export default class Controls extends LightningElement {
    @wire(editorSym, {})
    editor;

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
        const event = new CustomEvent('silencedetectbuttonclick', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
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
