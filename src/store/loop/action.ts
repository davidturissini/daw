import { CREATE_LOOP_NOTE } from './const';
import { Action } from 'store/index';
import { BeatRange } from 'util/audiorange';

export type CreateLoopNoteAction<K> = Action<{
    keyId: K;
    noteId: string;
    loopId: string;
    range: BeatRange;
}>
export function createLoopNote<K>(loopId: string, noteId: string, keyId: K, range: BeatRange): CreateLoopNoteAction<K> {
    return {
        type: CREATE_LOOP_NOTE,
        payload: {
            keyId,
            loopId,
            noteId,
            range,
        }
    }
}
