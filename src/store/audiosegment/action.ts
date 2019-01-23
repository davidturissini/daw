import {
    CREATE_AUDIO_SEGMENT,
    SET_AUDIO_SEGMENT_RANGE,
    MOVE_SEGMENT,
} from './const';

import { Action } from 'store/index';
import { AudioRange } from 'util/audiorange';
import { Time } from 'util/time';

export type MoveSegmentAction = Action<{
    segmentId: string;
    time: Time;
}>

export function moveSegment(segmentId: string, time: Time): MoveSegmentAction {
    return {
        type: MOVE_SEGMENT,
        payload: {
            segmentId,
            time,
        }
    }
}

export type SetAudioSegmentRangeAction = Action<{
    range: AudioRange;
    id: string;
}>

export function setAudioSegmentRange(id: string, range: AudioRange): SetAudioSegmentRangeAction {
    return {
        type: SET_AUDIO_SEGMENT_RANGE,
        payload: {
            id,
            range,
        }
    }
}

export type CreateAudioSegmentAction = Action<{
    id: string;
    trackId: string;
    range: AudioRange;
    sourceId: string;
}>

export function createAudioSegment(id: string, trackId: string, range: AudioRange, sourceId: string): CreateAudioSegmentAction {
    return {
        type: CREATE_AUDIO_SEGMENT,
        payload: {
            id,
            trackId,
            range,
            sourceId,
        }
    }
}
