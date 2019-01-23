import { Record, Map as ImmutableMap } from 'immutable';
import { AudioSegment } from './index';
import {
    CREATE_AUDIO_SEGMENT,
    SET_AUDIO_SEGMENT_RANGE,
    MOVE_SEGMENT,
} from './const';
import { CreateAudioSegmentAction, SetAudioSegmentRangeAction, MoveSegmentAction } from './action';
import { timeZero } from 'util/time';
import { AudioRange } from 'util/audiorange';

export class AudioSegmentState extends Record<{
    items: ImmutableMap<string, AudioSegment>;
}>({
    items: ImmutableMap(),
}) {}

function createAudioSegmentReducer(state: AudioSegmentState, action: CreateAudioSegmentAction) {
    const { id, trackId, range, sourceId } = action.payload;
    const segment = new AudioSegment({
        id,
        trackId,
        range,
        sourceId,
    });
    return state.setIn(['items', id], segment);
}

function setAudioSegmentRangeReducer(state: AudioSegmentState, action: SetAudioSegmentRangeAction): AudioSegmentState {
    const { range, id } = action.payload;
    return state.setIn(['items', id, 'range'], range);
}

function moveSegmentReducer(state: AudioSegmentState, action: MoveSegmentAction): AudioSegmentState {
    const { segmentId, time } = action.payload;
    const segment = state.items.get(segmentId) as AudioSegment;
    const newOffset = segment.range.start.plus(time).lessThan(timeZero) ? timeZero : segment.range.start.plus(time);
    const newRange = new AudioRange(newOffset, segment.range.duration);
    return state.setIn(['items', segmentId, 'range'], newRange);
}

export function reducer(state = new AudioSegmentState(), action) {
    switch(action.type) {
        case CREATE_AUDIO_SEGMENT:
            return createAudioSegmentReducer(state, action);
        case SET_AUDIO_SEGMENT_RANGE:
            return setAudioSegmentRangeReducer(state, action);
        case MOVE_SEGMENT:
            return moveSegmentReducer(state, action);
    }
    return state;
}
