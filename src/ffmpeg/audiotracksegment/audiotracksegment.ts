import { LightningElement, api, wire } from 'lwc';
import interact, { Interactable } from 'interactjs';
import rafThrottle from 'raf-throttle';
import { wireSymbol } from 'store/index';
import { EditorState } from 'store/editor/reducer';
import { pixelToTime } from 'util/geometry';
import { AudioSegment } from 'store/audiosegment';
import { AudioSourceState } from 'store/audiosource/reducer';

export type SegmentDoubleClickEvent = CustomEvent<{
    trackId: string;
    segmentId: string;
}>;

export default class AudioSegmentElement extends LightningElement {
    @api segment: AudioSegment;
    @api frame;
    @api track;
    @api visibleDuration;
    @api visibleOffset;

    @wire(wireSymbol, {
        paths: {
            editor: ['editor'],
            audiosource: ['audiosource', 'items']
        }
    })
    storeData: {
        data: {
            editor: EditorState
            audiosource: AudioSourceState['items']
        }
    };

    moveInteract: Interactable | null = null;
    startHandleIneract: Interactable | null = null;
    endHandleInteract: Interactable | null = null;
    doubleClickInteract: Interactable | null = null;

    get source() {
        return this.storeData.data.audiosource.get(this.segment.sourceId);
    }

    get editor() {
        return this.storeData.data.editor;
    }

    get selections() {
        return [];
        // return this.selection.data.selections.filter((selection) => {
        //     return selection.segmentId === this.segment.id;
        // })
        // .map((selection, index) => {
        //     const { range } = selection;
        //     const x = this.editor.data.timeToPixel(range.start.minus(this.segment.offset));
        //     const width = this.editor.data.timeToPixel(range.duration);
        //     const style = `width:${width}px;transform: translateX(${x}px)`
        //     return {
        //         id: index,
        //         style,
        //     }
        // })
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
        const time = pixelToTime(editor.frame, editor.visibleRange, dx);
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

    onDoubleTap = (evt) => {
        const event = new CustomEvent('segmentdoubleclick', {
            composed: true,
            bubbles: true,
            detail: {
                trackId: this.track.id,
                segmentId: this.segment.id,
            }
        });

        this.dispatchEvent(event);
    }

    onStartHandleDrag = rafThrottle((evt) => {
        const { editor, segment } = this;
        const { dx } = evt;
        const time = pixelToTime(editor.frame, editor.visibleRange, dx);
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
        const time = pixelToTime(editor.frame, editor.visibleRange, dx);
        const event = new CustomEvent('segmentdurationchange', {
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
        });

        this.doubleClickInteract = interact(this.template.host).on('doubletap', this.onDoubleTap);
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
        if (this.startHandleIneract) {
            this.startHandleIneract.unset();
        }

        if (this.endHandleInteract) {
            this.endHandleInteract.unset();
        }

        if (this.moveInteract) {
            this.moveInteract.unset();
        }

        if (this.doubleClickInteract) {
            this.doubleClickInteract.unset();
        }

        this.moveInteract = null;
        this.startHandleIneract = null;
        this.endHandleInteract = null;
    }
}
