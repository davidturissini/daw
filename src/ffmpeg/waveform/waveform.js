import { LightningElement, api, wire, track } from 'lwc';
import { waveformSym, WaveformState } from './../../wire/waveform';
import { editorSym } from './../../wire/editor';
import rafThrottle from 'raf-throttle';

const drawWaveformImage = rafThrottle((canvas, start, len, waveform) => {
    const interpolateHeight = (total_height) => {
        const amplitude = 256;
        return (size) => total_height - ((size + 128) * total_height) / amplitude;
    };

    const y = interpolateHeight(canvas.height);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    for(let i = start; i < start + len; i += 1) {
        const min = waveform.min[i];
        const x = i - start;
        ctx.lineTo(x + 0.5, y(min) + 0.5);
    }

    for(let i = start + len - 1; i >= start; i -= 1) {
        const max = waveform.max[i];
        const x = i - start;
        ctx.lineTo(x + 0.5, y(max) + 0.5);
    }

    ctx.closePath();
    ctx.stroke();
    ctx.fill();
});

export default class Waveform extends LightningElement {
    @api offset;
    @api duration;
    @api source;

    previousWaveform = null;

    @wire(waveformSym, {})
    waveforms;

    get waveform() {
        return this.waveforms.data.get(this.source.id, null);
    }

    get hasWaveform() {
        return !!this.waveforms.data.has(this.source.id)
    }

    get waveformReady() {
        return (
            this.hasWaveform &&
            this.waveform.state === WaveformState.READY
        );
    }

    get canvas() {
        return this.template.querySelector('canvas');
    }

    get canvasWidth() {
        return this.getWaveformBounds().length;
    }

    getWaveformBounds() {
        const numberOfTicks = this.waveform.data.min.length;
        const percentOffset = this.offset.milliseconds / this.source.duration.milliseconds;
        const durationPercent = this.duration.milliseconds / this.source.duration.milliseconds;
        const start = Math.floor(percentOffset * numberOfTicks);
        const length = Math.floor(durationPercent * numberOfTicks);

        return {
            start,
            length,
        };
    }

    /*
     *
     *  Life cycle
     *
     */
    renderedCallback() {
        // Handle waveform change
        if (this.waveformReady) {
            const bounds = this.getWaveformBounds();
            drawWaveformImage(
                this.canvas,
                bounds.start,
                bounds.length,
                this.waveform.data
            );
        }
    }
}
