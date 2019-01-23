import { BaseState } from './base';
import { IdleState } from './idle';
import { stop } from '../../../wire/playhead';
import { AudioRange } from '../../../util/audiorange';
import { audioContext } from './../../../wire/audiosource';
import { appStore } from 'store/index';
import { AudioSegment } from 'store/audiosegment';
import { AudioSource } from 'store/audiosource';
import { AudioTrack } from 'store/audiotrack';
import { Arpeggiator } from './../../../sequencer/Arpeggiator';
import { Time } from 'util/time';

const ctx = audioContext as AudioContext;

export class PlayingState extends BaseState {
    range: AudioRange;
    constructor(range) {
        super();
        this.range = range;
    }
    enter() {
        const {
            audiosegment,
            audiosource,
            audiotrack,
            instrument,
        } = appStore.getState();
        audiosegment.items.forEach((audioSegment: AudioSegment) => {
            const track = audiotrack.items.get(audioSegment.trackId) as AudioTrack;
            const trackInstrument = instrument.items.get(track.instrumentId);
            const source = audiosource.items.get(audioSegment.sourceId) as AudioSource;
            const arpeggiator = new Arpeggiator(ctx, trackInstrument);
            arpeggiator.start(new Time(0));
        })
    }

    exit() {
        stop();
    }

    onStopButtonClick(app, evt) {
        app.enterState(new IdleState());
    }
}
