import { LightningElement, api, wire } from 'lwc';
import { audioSources } from './../../wire/audiosource';
import { editorSym } from './../../wire/editor';

export default class AudioTrack extends LightningElement {
    @api track;

    @wire(editorSym, {})
    editor;

    get trackSegments() {
        return this.track.segments.toJS().filter((segment) => {
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
            } else if (width + x > frameWidth) {
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
        });
    }

}
