import { LightningElement, api, wire } from 'lwc';
import { audioSources } from './../../wire/audiosource';
import { editorSym } from './../../wire/editor';
import interact from 'interactjs';
import rafThrottle from 'raf-throttle';

export default class AudioTrackSegment extends LightningElement {
    @api segment;
    @api frame;
    @api track;

    @wire(editorSym, {})
    editor;

    @wire(audioSources, {})
    sources;

    moveInteract;
    startHandleIneract;
    endHandleInteract;

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

    onStartDrag = (evt) => {
        const event = new CustomEvent('segmentdragstart', {
            composed: true,
            bubbles: true,
        });

        this.dispatchEvent(event);
    }

    onDrag = (evt) => {
        const { editor, segment } = this;
        const { dx } = evt;
        const time = editor.data.pixelToTime(dx);
        const event = new CustomEvent('segmentmove', {
            composed: true,
            bubbles: true,
            detail: {
                time,
                segmentId: segment.id,
            }
        });

        this.dispatchEvent(event);
    }

    onEndDrag = (evt) => {
        const event = new CustomEvent('segmentdragend', {
            composed: true,
            bubbles: true,
        });

        this.dispatchEvent(event);
    }

    onStartHandleDrag = rafThrottle((evt) => {
        const { editor, segment } = this;
        const { dx } = evt;
        const time = editor.data.pixelToTime(dx);
        const event = new CustomEvent('segmentsourceoffsetchange', {
            composed: false,
            bubbles: true,
            detail: {
                time,
                segmentId: segment.id,
            }
        });

        this.dispatchEvent(event);
    })

    onEndHandleDrag = rafThrottle((evt) => {
        const { editor, segment } = this;
        const { dx } = evt;
        const time = editor.data.pixelToTime(dx);
        const event = new CustomEvent('segmentdurationchange', {
            composed: false,
            bubbles: true,
            detail: {
                time,
                segmentId: segment.id,
            }
        });

        this.dispatchEvent(event);
    })

    get containerStyle() {
        return `background: ${this.track.color.rgb()}`;
    }

    /*
     *
     *
     * Lifecycle
     *
     *
    */
    connectedCallback() {
        this.moveInteract = interact(this.template.host).draggable({
            inertia: false,
            axis: 'y',
            onmove: this.onDrag,
            onstart: this.onStartDrag,
            onend: this.onEndDrag,
        })
    }

    renderedCallback() {
        if (!this.startHandleIneract) {
            this.startHandleIneract = interact(this.template.querySelector('.handle--start'))
                .draggable({
                    inertia: false,
                    axis: 'x',
                    onmove: this.onStartHandleDrag,
                })
        }

        if (!this.endHandleInteract) {
            this.endHandleInteract = interact(this.template.querySelector('.handle--end'))
                .draggable({
                    inertia: false,
                    axis: 'x',
                    onmove: this.onEndHandleDrag,
                })
        }
    }

    disconnectedCallback() {
        this.startHandleIneract.unset();
        this.endHandleInteract.unset();
        this.moveInteract.unset();

        this.moveInteract = null;
        this.startHandleIneract = null;
        this.endHandleInteract = null;
    }
}
