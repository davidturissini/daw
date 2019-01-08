import { LightningElement, api, wire, track } from 'lwc';
import { waveformSym, WaveformState } from './../../wire/waveform';
import rafThrottle from 'raf-throttle';

function getWaveformBounds(waveform, sourceOffset, sourceDuration, offset, duration) {
    const numberOfTicks = waveform.data.min.length;
    const percentOffset = (offset.milliseconds + sourceOffset.milliseconds) / sourceDuration.milliseconds;
    const durationPercent = duration.milliseconds / sourceDuration.milliseconds;
    const start = Math.floor(percentOffset * numberOfTicks);
    const length = Math.floor(durationPercent * numberOfTicks);
    return {
        start,
        length,
    };
}

const drawWaveformImage = (start, len, waveform) => {
    const canvas = document.createElement('canvas');
    const canvasWidth = canvas.width = len;
    canvas.height = 60;
    const interpolateHeight = (total_height) => {
        const amplitude = 256;
        return (size) => total_height - ((size + 128) * total_height) / amplitude;
    };

    const y = interpolateHeight(canvas.height);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    const equal = canvasWidth / len;
    for(let i = start; i < start + len; i += 1) {
        const min = waveform.min[i];
        const x = i - start;
        ctx.lineTo(x * equal, y(min) + 0.5);
    }

    for(let i = start + len - 1; i >= start; i -= 1) {
        const max = waveform.max[i];
        const x = i - start;
        ctx.lineTo(x * equal, y(max) + 0.5);
    }

    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    return new Promise((res) => {
        console.log('blob?')
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            res(url);
        });
    });
};

const sourceSym = Symbol();
const sourceOffsetSym = Symbol();

export default class Waveform extends LightningElement {
    @api offset;
    @api duration;
    @track waveformSrc;
    @track waveformState;

    @api
    get sourceOffset() {
        return this[sourceOffsetSym];
    }

    set sourceOffset(value) {
        this[sourceOffsetSym] = value;
        this.drawWaveform();
    }

    @api
    get source() {
        return this[sourceSym];
    }

    set source(value) {
        this[sourceSym] = value;
        this.drawWaveform();
    }

    @wire(waveformSym, {})
    waveforms({ data }) {
        if (this.source) {
            const waveform = this.waveform = data.get(this.source.id, null);
            this.waveformState = waveform.state;
            this.drawWaveform();
        }
    }


    get hasWaveform() {
        return !!this.waveformSrc;
    }

    get waveformReady() {
        return this.waveformState === WaveformState.READY;
    }

    get canvas() {
        return this.template.querySelector('canvas');
    }

    get canvasWidth() {
        return this.getWaveformBounds().length;
    }

    drawWaveform = rafThrottle(() => {
        const { waveform, source, sourceOffset, offset, duration } = this;
        if (!waveform || !source || !sourceOffset || !offset || !duration) {
            return;
        }

        const bounds = getWaveformBounds(
            waveform,
            sourceOffset,
            source.duration,
            offset,
            duration,
        );
        drawWaveformImage(
            bounds.start,
            bounds.length,
            waveform.data,
        )
        .then((url) => this.waveformSrc = url)
    })
}
