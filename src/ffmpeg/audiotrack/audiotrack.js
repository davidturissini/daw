import { LightningElement, api, wire } from 'lwc';
import { editorSym } from './../../wire/editor';
import { audioSources } from './../../wire/audiosource';
import {
    moveSegment,
    moveSegmentSourceOffset,
    setSegmentDuration,
    deleteSegment,
    setTrackFrame,
} from './../../wire/audiotrack';

export default class AudioTrack extends LightningElement {
    @api track;

    @wire(editorSym, {})
    editor;

    @wire(audioSources, {})
    audioSources;

    get trackSelections() {
        return this.track.selections.toList().map((selection, index) => {
            const { range } = selection;
            const x = this.editor.data.timeToPixel(range.start);
            const width = this.editor.data.timeToPixel(range.duration);
            const style = `width:${width}px;transform: translateX(${x}px)`
            return {
                id: index,
                style,
            }
        })
    }

    get trackSegments() {
        return this.track.segments.filter((segment) => {
            const x = this.editor.data.timeToPixel(segment.offset);
            const width = this.editor.data.durationToWidth(segment.duration);
            const frameWidth = this.editor.data.frame.width;


            const isOnScreenLeft = x > 0 || x + width > 0;
            const isOnScreenRight = x < frameWidth;

            return isOnScreenLeft && isOnScreenRight;
        })
        .map((segment, index) => {
            const frameWidth = this.editor.data.frame.width;
            const segmentOffset = this.editor.data.timeToPixel(segment.offset);
            let width = this.editor.data.durationToWidth(segment.duration);
            const x = segmentOffset;
            if (x < 0) {
                width += x;
            }

            if (width + x > frameWidth) {
                const diff = (width + x) - frameWidth;
                width = width - diff;
            }
            const frame = {
                x: Math.max(x, 0),
                width,
            };
            return {
                key: index,
                frame,
                style: `transform: translateX(${frame.x}px); width:${width}px`,
                segment,
            };
        })
        .toList()
        .toJS();
    }

    handleSegmentMove(evt) {
        const { time, segmentId } = evt.detail;
        moveSegment(
            this.track.id,
            segmentId,
            time,
        );
    }

    handleSegmentSourceOffsetChange(evt) {
        const { time, segmentId } = evt.detail;
        moveSegmentSourceOffset(
            this.track.id,
            segmentId,
            time,
        );
    }

    handleSegmentDurationChange(evt) {
        const { time, segmentId } = evt.detail;
        const audioSourceId = this.track.segments.getIn([segmentId, 'sourceId']);
        const audioSource = this.audioSources.data.get(audioSourceId);
        setSegmentDuration(
            this.track.id,
            segmentId,
            audioSource,
            time,
        );
    }

    onSegmentKeyUp(evt) {
        const { id: segmentId } = evt.target.segment;
        if (evt.which === 8) {
            deleteSegment(this.track.id, segmentId);
        }
    }

    /*
     *
     * Lifecycle
     *
    */
    renderedCallback() {
        if (!this.track.frame) {
            const rect = this.template.host.getBoundingClientRect();
            const frame = {
                left: this.template.host.offsetLeft,
                top: this.template.host.offsetTop,
                width: rect.width,
                height: rect.height,
            };
            setTrackFrame(this.track.id, frame);
        }
    }

}
