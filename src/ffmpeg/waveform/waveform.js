import { LightningElement, api, wire, track } from 'lwc';
import { waveformSym, loadWaveform, WaveformState } from './../../wire/waveform';
import { editorSym } from './../../wire/editor';
import { AudioSourceState } from '../../wire/audiosource';

const waveformSource = Symbol();

export default class Waveform extends LightningElement {
    /*
     *
     * Editor
     *
    */
    @wire(editorSym, {})
    editor;

    @api offset;

    @api
    get source() {
        return this[waveformSource];
    }

    set source(value) {
        if (
            !this.waveforms.data.has(value.id) &&
            value.state === AudioSourceState.READY
        ) {
            loadWaveform(value);
        }

        this[waveformSource] = value;
    }

    @wire(waveformSym, {})
    waveforms;

    get waveform() {
        return this.waveforms.data.get(this.source.id);
    }

    get hasWaveform() {
        return !!this.waveform;
    }

    get waveformReady() {
        return this.waveform.state === WaveformState.READY;
    }

    get waveformStyle() {
        const width = this.editor.data.durationToWidth(this.source.duration);
        const sourceOffsetWidth = this.editor.data.durationToWidth(this.offset);

        return `transform: translateX(-${sourceOffsetWidth}px); width: ${width}px`;
    }

    get canvas() {
        return this.template.querySelector('canvas');
    }
}
