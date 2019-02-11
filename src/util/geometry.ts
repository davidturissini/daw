import { Time } from './time';
import { AudioRange } from './audiorange';

export interface Origin {
    x: number;
    y: number;
}

export interface Frame {
    height: number;
    width: number;
}

export interface Rect extends Frame, Origin {}

export function pixelToTime(frame: Frame, range: AudioRange, pixel: number): Time {
    const { width } = frame;
    const percent = (pixel / width);

    const millisecond = percent * range.duration.milliseconds;
    return new Time(millisecond);
}

export function timeToPixel(frame: Frame, range: AudioRange, time: Time): number {
    const { width } = frame;
    const percent = (time.milliseconds - range.start.milliseconds) / range.duration.milliseconds;

    return percent * width;
}

export function absolutePixelToTime(frame: Frame, range: AudioRange, pixel: number): Time {
    const time = pixelToTime(frame, range, pixel);
    return time.plus(range.start);
}

export function durationToWidth(frame: Frame, range: AudioRange, time: Time) {
    const { width } = frame;
    const pixelsPerMillisecond = width / range.duration.milliseconds;

    return pixelsPerMillisecond * time.milliseconds
}

export function frameToCSS(frame: Frame): string {
    return `width: ${frame.width}px; height: ${frame.height}px`;
}

export function rectToCSS(rect: Rect): string {
    return `transform:translate(${rect.x}px, ${rect.y}px);${frameToCSS(rect)}`
}
