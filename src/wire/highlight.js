import { register } from 'wire-service';
import { getFFMPEG } from './ffmpeg';
import { rasterize } from './playhead';
import { Time } from '../util/time';
import toWav from 'audiobuffer-to-wav';
import { AudioRange } from './../util/audiorange';
import { BehaviorSubject } from 'rxjs';
import { Record, Map as ImmutableMap } from 'immutable';
import { wireObservable } from './../util/wire-observable';
import { generateId } from './../util/uniqueid';

class Highlight extends Record({
    id: null,
    range: null,
}) {

}

class HighlightState extends Record({
    items: new ImmutableMap(),
}) {

}

const highlightSubject = new BehaviorSubject(new HighlightState());
const stream = highlightSubject.asObservable();

function dispatch(func) {
    return function (...args) {
        const nextState = func(...args);
        highlightSubject.next(nextState);
    }
}

export const clearHighlight = dispatch((id) => {
    return highlightSubject.value.deleteIn(['items', id]);
});

function createHighlightFromRange(range) {
    const id = generateId();
    return new Highlight({
        range,
        id,
    });
}

export const highlightRange = dispatch((range) => {
    const highlight = createHighlightFromRange(range);

    return highlightSubject.value.update('items', (items) => {
        return items.set(highlight.id, highlight);
    })
});

export function highlightSilences(range) {
    rasterize(range).then((audioBuffer) => {
        return getFFMPEG().then((ffmpeg) => {
            const wav = toWav(audioBuffer);
            const uint8 = new Uint8Array(wav);

            const process = ffmpeg.createProcess([
                '-i',
                'input.wav',
                '-af',
                'silencedetect=n=-50dB:d=0.5',
                'output.wav'
            ], [{
                name: 'input.wav',
                data: uint8,
            }]);

            const ranges = [];
            let currentStart = null;
            process.stdout = ({ data }) => {
                if(/silence_start/.test(data)) {
                    let startTime = parseFloat(data.split(': ')[1]);
                    if (startTime < 0) {
                        startTime = 0;
                    }
                    currentStart = Time.fromSeconds(startTime);
                } else if (/silence_end/.test(data)) {
                    const endTime = Time.fromSeconds(parseFloat(data.split(': ')[1]));
                    const duration = endTime.minus(currentStart);
                    ranges.push(new AudioRange(currentStart.add(range.start), duration));
                    currentStart = null;

                }
            }

            return process.execute().then(() => ranges);
        })
        .then((ranges) => {
            const highlights = ranges.reduce((seed, range) => {
                const highlight = createHighlightFromRange(range);
                return seed.set(highlight.id, highlight);
            }, new ImmutableMap());

            highlightSubject.next(
                highlightSubject.value.update('items', (items) => {
                    return items.merge(highlights);
                })
            )
        });
    });
}

export const highlightSym = Symbol();

register(highlightSym, wireObservable(stream));
