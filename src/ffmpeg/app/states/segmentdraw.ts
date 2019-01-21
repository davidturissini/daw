import { BaseState } from './base';
import { createAudioSegment } from 'store/audiosegment/action';
import { appStore } from 'store/index';
import { generateId } from 'util/uniqueid';
import { AudioRange } from 'util/audiorange';
import { timeZero, Time } from 'util/time';
import { IdleState } from './idle';

export class SegmentDrawState extends BaseState {
    trackId: string | null = null;
    onAudioTrackMouseDown(app, evt, trackId) {
        evt.preventDefault();
        const id = generateId();
        const range = new AudioRange(timeZero, new Time(5000));
        appStore.dispatch(createAudioSegment(id, trackId, range))
    }

    onDocumentKeyUp(app, evt) {
        app.enterState(new IdleState());
    }
}
