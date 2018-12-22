import { LightningElement, api, wire } from 'lwc';
import { waveformSym } from './../../wire/waveform';
import { editorSym } from './../../wire/editor';

export default class Waveform extends LightningElement {
    /*
     *
     * Editor
     *
    */
    @wire(editorSym, {})
    editor;


    @api track;

    get trackId() {
        return this.track.id;
    }

    @wire(waveformSym, { trackId: '$trackId' })
    waveform;

    get isReady() {
        return this.waveform && this.waveform.data !== undefined;
    }

    get waveformBlobUrl() {
        return this.waveform.data.url;
    }

    get waveformWidth() {
        if (!this.editor) {
            return 0;
        }
        return this.editor.data.durationToWidth(this.track.duration);
    }

    connectedCallback() {
        this.template.host.style.width = `${this.waveformWidth}px`;
    }

}
