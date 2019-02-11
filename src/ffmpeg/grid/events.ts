import { AudioRange, BeatRange } from 'util/audiorange';
import { Time } from 'util/time';

export type TimelineMouseEnterEvent = CustomEvent<{}>;
export type TimelineMouseLeaveEvent = CustomEvent<{}>;

export type AudioRangeChangeEvent = CustomEvent<{
    range: AudioRange;
    beatRange: BeatRange;
    id: string;
    rowIndex: number;
}>

export type GridCloseEvent = CustomEvent<{}>;

export type GridClickEvent = CustomEvent<{
    time: Time;
}>

export type GridRangeChangeEvent = CustomEvent<{
    range: AudioRange;
}>
