import { LightningElement, api, wire } from 'lwc';
import {
    deleteTrackSegment,
} from '../../wire/audiotrack';
import { timeZero } from '../../util/time';
import { wireSymbol, appStore } from 'store/index';
import { InstrumentState } from 'store/instrument/reducer';
import { setTrackRect } from 'store/audiotrack/action';
import { AudioTrack } from 'store/audiotrack';
import { AudioSegmentState } from 'store/audiosegment/reducer';
import { AudioSegment } from 'store/audiosegment';
import { EditorState } from 'store/editor/reducer';
import { timeToPixel, pixelToTime, durationToWidth } from 'util/geometry';

export default class AudioTrackElement extends LightningElement {
    @api track: AudioTrack;

    @wire(wireSymbol, {
        paths: {
            instruments: ['instrument', 'items'],
            segments: ['audiosegment', 'items'],
            editor: ['editor']
        }
    })
    storeData: {
        data: {
            instruments: InstrumentState['items'];
            segments: AudioSegmentState['items'];
            editor: EditorState;
        }
    }

    get instrument() {
        const { instrumentId } = this.track;
        if (instrumentId) {
            return this.storeData.data.instruments.get(instrumentId);
        }
        return null;
    }

    get trackSegments() {
        const segmentsMap = this.storeData.data.segments;
        return this.track.segments.map((segmentId) => {
            return segmentsMap.get(segmentId);
        });
    }

    get visibleSegments() {
        const { editor } = this.storeData.data;
        const { frame: editorFrame, visibleRange: editorVisibleRange } = editor;
        return this.trackSegments.filter((segment: AudioSegment) => {
            const { range } = segment;
            const x = timeToPixel(editorFrame, editorVisibleRange, range.start);
            const width = durationToWidth(editorFrame, editorVisibleRange, range.duration);
            const frameWidth = editorFrame.width;

            const isOnScreenLeft = x > 0 || x + width > 0;
            const isOnScreenRight = x < frameWidth;

            return isOnScreenLeft && isOnScreenRight;
        })
        .map((segment: AudioSegment, index) => {
            const { range } = segment;
            const frameWidth = editorFrame.width;
            const segmentOffset = timeToPixel(editorFrame, editorVisibleRange, range.start);
            let width = durationToWidth(editorFrame, editorVisibleRange, range.duration);
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

            const visibleDuration = pixelToTime(editorFrame, editorVisibleRange, width);
            const visibleOffset = range.start.greaterThan(editor.visibleRange.start) ? timeZero : editorVisibleRange.start.minus(range.start);

            return {
                key: index,
                frame,
                style: `transform: translateX(${frame.x}px); width:${width}px; background: ${this.track.color.rgb()}`,
                segment,
                visibleDuration,
                visibleOffset,
            };
        })
        .toList()
        .toJS();
    }

    onSegmentKeyUp(evt) {
        const { id: segmentId } = evt.target.segment;
        if (evt.which === 8) {
            deleteTrackSegment(this.track.id, segmentId);
        }
    }

    /*
     *
     * Lifecycle
     *
    */
    renderedCallback() {
        if (!this.track.rect) {
            const { host } = this.template;
            const rect = host.getBoundingClientRect();
            appStore.dispatch(
                setTrackRect(
                    this.track.id,
                    host.offsetLeft,
                    host.offsetTop,
                    rect.width,
                    rect.height,
                )
            );
        }
    }

}
