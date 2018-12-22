import { register, ValueChangedEvent } from 'wire-service';
import { getInstance } from './ffmpeg';
import { getTrackById } from './audiotracks';

let wiredEventTarget = undefined;
let waveforms = {};

class Waveform {
    constructor(arrayBuffer) {
        const uint8 = new Uint8Array(arrayBuffer);
        this.blob = new Blob([uint8]);
        this.url = URL.createObjectURL(this.blob);
    }
}

function dispatch(eventTarget, trackId) {
    eventTarget.dispatchEvent(
        new ValueChangedEvent({
            data: waveforms[trackId],
            error: undefined,
        }),
    )
}

function loadWaveform(eventTarget, ffmpeg, track) {
    const { id: trackId } = track;
    if (waveforms[trackId]) {
        dispatch(eventTarget, trackId);
        return;
    }

    const process = ffmpeg.createProcess([
        '-i',
        'input.mp3',
        '-filter_complex',
        'compand,showwavespic=s=640x120',
        '-frames:v',
        '1',
        'output.jpg'
    ], [{
        name: 'input.mp3',
        data: track.data,
    }]);

    process.execute()
        .then((result) => {
            const waveform = new Waveform(result.data[0].data);
            waveforms[trackId] = waveform;
            dispatch(eventTarget, trackId);
        });
}


export const waveformSym = Symbol();

register(waveformSym, function (eventTarget) {
    wiredEventTarget = eventTarget;

    wiredEventTarget.addEventListener('config', ({ trackId }) => {
        const ffmpeg = getInstance();
        const track = getTrackById(trackId);
        loadWaveform(eventTarget, ffmpeg, track);
    });

});
