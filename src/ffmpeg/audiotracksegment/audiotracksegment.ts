import { LightningElement, api, wire } from 'lwc';
import { audioSources } from '../../wire/audiosource';
import { editorSym } from '../../wire/editor';
import interact from 'interactjs';
import rafThrottle from 'raf-throttle';
import { selectionSym } from '../../wire/selection';

export default class AudioTrackSegment extends LightningElement {
    @api segment;
    @api frame;
    @api track;
    @api visibleDuration;
    @api visibleOffset;

    @wire(editorSym, {})
    editor;

    @wire(audioSources, {})
    sources;

    @wire(selectionSym, {})
    selection;

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
        const { editor, visibleDuration } = this;
        const width = editor.data.durationToWidth(visibleDuration);
        return `width: ${width}px`;
    }

    get selections() {
        return this.selection.data.selections.filter((selection) => {
            return selection.segmentId === this.segment.id;
        })
        .map((selection, index) => {
            const { range } = selection;
            const x = this.editor.data.timeToPixel(range.start.minus(this.segment.offset));
            const width = this.editor.data.timeToPixel(range.duration);
            const style = `width:${width}px;transform: translateX(${x}px)`
            return {
                id: index,
                style,
            }
        })
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
        const event = new CustomEvent('segmentdrag', {
            composed: true,
            bubbles: true,
            detail: {
                trackId: this.track.id,
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
            composed: true,
            bubbles: true,
            detail: {
                time,
                trackId: this.track.id,
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
            composed: true,
            bubbles: true,
            detail: {
                time,
                trackId: this.track.id,
                segmentId: segment.id,
                sourceId: segment.sourceId,
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