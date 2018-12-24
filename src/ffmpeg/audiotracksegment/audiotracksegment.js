import { LightningElement, api, wire } from 'lwc';
import { audioSources } from './../../wire/audiosource';
import { editorSym } from './../../wire/editor';
import interact from 'interactjs';

export default class AudioTrackSegment extends LightningElement {
    @api segment;
    @api frame;

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

    onDrag = (evt) => {
        const { editor, segment } = this;
        const { dx } = evt;
        const time = editor.data.pixelToTime(dx);
        const event = new CustomEvent('segmentmove', {
            composed: false,
            bubbles: true,
            detail: {
                time,
                segmentId: segment.id,
            }
        });

        this.dispatchEvent(event);
    }

    /*
     *
     *
     * Lifecycle
     *
     *
    */
    connectedCallback() {
        interact(this.template.host).draggable({
            inertia: true,
            axis: 'y',
            onmove: this.onDrag,
        })
    }
}
