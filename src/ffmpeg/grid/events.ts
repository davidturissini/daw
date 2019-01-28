import { AudioRange } from 'util/audiorange';
import { Time } from 'util/time';

export type TimelineMouseEnterEvent = CustomEvent<{}>;
export type TimelineMouseLeaveEvent = CustomEvent<{}>;
export type TimelineDragEvent = CustomEvent<{
    dx: number;
    windowId: string;
}>;
export type TimelineDragStartEvent = CustomEvent<{
    windowId: string;
}>;
export type TimelineDragEndEvent = CustomEvent<{
    windowId: string;
}>;

export type AudioRangeCreatedEvent = CustomEvent<{
    range: AudioRange;
    parentId: string;
    id: string;
}>;

export type AudioRangeChangeEvent = CustomEvent<{
    range: AudioRange;
    id: string;
    parentId: string;
}>

export type GridAudioWindowCreatedEvent = CustomEvent<{
    windowId: string;
}>

export type GridCloseEvent = CustomEvent<{}>;

export type GridClickEvent = CustomEvent<{
    time: Time;
}>
