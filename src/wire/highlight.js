import { register } from 'wire-service';
import { getFFMPEG } from './ffmpeg';
import { rasterize } from './playhead';
import { Time } from '../util/time';
import { audioContext } from './audiosource';
import toWav from 'audiobuffer-to-wav';
import { AudioRange } from './../util/audiorange';
import { BehaviorSubject } from 'rxjs';
import { Record, List } from 'immutable';
import { wireObservable } from './../util/wire-observable';
import { generateId } from './../util/uniqueid';

class Highlight extends Record({
    id: null,
    range: null,
}) {

}

class HighlightState extends Record({
    items: new List(),
}) {

}

const highlightSubject = new BehaviorSubject(new HighlightState());
const stream = highlightSubject.asObservable();

export function highlightSilences() {
    const range = new AudioRange(new Time(0), new Time(10000));
    rasterize(range).then((audioBuffer) => {
        return getFFMPEG().then((ffmpeg) => {
            const wav = toWav(audioBuffer);
            const uint8 = new Uint8Array(wav);

            const process = ffmpeg.createProcess([
                '-i',
                'input.wav',
                '-af',
                'silencedetect=n=-50dB:d=1',
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
                    currentStart = Time.fromSeconds(startTime)
                } else if (/silence_end/.test(data)) {
                    const endTime = Time.fromSeconds(parseFloat(data.split(': ')[1]));
                    const duration = endTime.minus(currentStart);
                    ranges.push(new AudioRange(currentStart, duration));
                    currentStart = null;

                }
            }

            return process.execute().then(() => ranges);
        })
        .then((ranges) => {
            const highlights = ranges.map((range) => {
                return new Highlight({
                    range,
                    id: generateId(),
                })
            });

            highlightSubject.next(
                highlightSubject.value.update('items', (items) => {
                    return items.concat(highlights);
                })
            )
        });
    });
}

export const highlightSym = Symbol();

register(highlightSym, wireObservable(stream));
