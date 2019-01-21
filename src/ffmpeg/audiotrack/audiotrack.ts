import { LightningElement, api, wire } from 'lwc';
import { editorSym } from '../../wire/editor';
import { audioSources } from '../../wire/audiosource';
import {
    deleteTrackSegment,
} from '../../wire/audiotrack';
import { audioTrackSegmentsSymbol, mapAudioTrackSegments } from '../../wire/audiotracksegment';
import { Time } from '../../util/time';
import { wireSymbol, appStore } from 'store/index';
import { InstrumentState } from 'store/instrument/reducer';
import { setTrackRect } from 'store/audiotrack/action';

export default class AudioTrackElement extends LightningElement {
    @api track: AudioTrack;

    @wire(wireSymbol, {
        paths: {
            instruments: ['instrument', 'items']
        }
    })
    storeData: {
        data: {
            instruments: InstrumentState['items']
        }
    }

    get instrument() {
        return this.storeData.data.instruments.get(this.track.instrumentId);
    }

    @wire(audioTrackSegmentsSymbol, {})
    audioTrackSegments;

    @wire(editorSym, {})
    editor;

    @wire(audioSources, {})
    audioSources;

    get trackSegments() {
        return mapAudioTrackSegments(
            this.track.segments,
            this.audioTrackSegments.data
        )
        .filter((segment) => {
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

            const visibleDuration = this.editor.data.pixelToTime(width);
            const visibleOffset = segment.offset.greaterThan(this.editor.data.visibleRange.start) ? new Time(0) : this.editor.data.visibleRange.start.minus(segment.offset);

            return {
                key: index,
                frame,
                style: `transform: translateX(${frame.x}px); width:${width}px`,
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
            const rect = this.template.host.getBoundingClientRect();
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
