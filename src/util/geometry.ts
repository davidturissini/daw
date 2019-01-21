import { Time } from './time';
import { AudioRange } from './audiorange';

export interface Frame {
    height: number;
    width: number;
}

export interface Rect extends Frame {
    x: number;
    y: number;
}

export function pixelToTime(frame: Frame, range: AudioRange, pixel: number) {
    const { width } = frame;
    const percent = (pixel / width);

    const millisecond = percent * range.duration.milliseconds;
    return new Time(millisecond);
}
