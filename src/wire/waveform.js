import { register, ValueChangedEvent } from 'wire-service';
import { getInstance } from './ffmpeg';
import WaveformData from 'waveform-data';
import { wireObservable } from './../util/wire-observable';
import { BehaviorSubject } from 'rxjs';
import { Map as ImmutableMap, Record } from 'immutable';
import { audioContext } from './audiosource';
import webAudioBuilder from 'waveform-data/webaudio';

const waveformSubject = new BehaviorSubject(new ImmutableMap());

export const WaveformState = {
    LOADING: 'Loading',
    READY: 'Ready',
};

class Waveform extends Record({
    sourceId: null,
    blob: null,
    url: null,
    state: null,
}) {

}

function drawWaveformImage(waveform) {
    const canvas = document.createElement('canvas');
    const interpolateHeight = (total_height) => {
        const amplitude = 256;
        return (size) => total_height - ((size + 128) * total_height) / amplitude;
    };

    const y = interpolateHeight(canvas.height);
    const ctx = canvas.getContext('2d');
    ctx.beginPath();

    // from 0 to 100
    waveform.min.forEach((val, x) => {
        ctx.lineTo(x + 0.5, y(val) + 0.5);
    });

    // then looping back from 100 to 0
    waveform.max.reverse().forEach((val, x) => {
        ctx.lineTo((waveform.offset_length - x) + 0.5, y(val) + 0.5);
    });

    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    return new Promise((res) => {
        canvas.toBlob(function (blob) {
            res(blob);
        });
    })
}

function generateWaveform(source) {
    webAudioBuilder(audioContext, source.data, (err, waveform) => {
        if (err) {
          console.error(err);
          return;
        }

        drawWaveformImage(waveform).then((blob) => {
            const url = URL.createObjectURL(blob);
            waveformSubject.next(
                waveformSubject.value.mergeIn([source.id], {
                    state: WaveformState.READY,
                    blob,
                    url,
                })
            )
        });
      });
}

export function loadWaveform(source) {
    const { id: sourceId } = source;
    if (waveformSubject.value.has(sourceId)) {
        return;
    }

    const waveform = new Waveform({
        sourceId,
        state: WaveformState.LOADING,
    });

    waveformSubject.next(
        waveformSubject.value.set(sourceId, waveform)
    );

    generateWaveform(source);

}

export const waveformSym = Symbol();

register(waveformSym, wireObservable(waveformSubject.asObservable()));
