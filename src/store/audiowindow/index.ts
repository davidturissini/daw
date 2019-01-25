import { Record } from 'immutable';
import { Frame } from 'util/geometry';
import { AudioRange } from 'util/audiorange';
import { timeZero } from 'util/time';

export class AudioWindow extends Record<{
    id: string;
    frame: Frame;
    visibleRange: AudioRange;
    quanitization: number;
}>({
    id: '',
    frame: {
        height: 0,
        width: 0,
    },
    visibleRange: new AudioRange(timeZero, timeZero),
    quanitization: 1 / 4,
}) {

}
