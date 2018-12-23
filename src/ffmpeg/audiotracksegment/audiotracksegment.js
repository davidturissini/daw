import { LightningElement, api, wire } from 'lwc';
import { audioSources } from './../../wire/audiosource';
import { editorSym } from './../../wire/editor';

const frameSym = Symbol();

export default class AudioTrackSegment extends LightningElement {
    @api segment
    @api frame

    @wire(editorSym, {})
    editor;

    @wire(audioSources, {})
    sources;

    get hasSource() {
        return !!this.source;
    }

    get source() {
        return this.sources.data.get(this.segment.sourceId);
    }

    get waveformStyle() {
        const { frame, editor, segment } = this;
        const segmentOffset = editor.data.timeToPixel(segment.offset);
        const diff = frame.x - segmentOffset;
        return `transform: translateX(-${diff}px); width: ${frame.width + diff}px`;
    }
}
