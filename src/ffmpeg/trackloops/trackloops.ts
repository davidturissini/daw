import { LightningElement, api } from 'lwc';
import { AudioTrack } from 'store/audiotrack';

export type CreateTrackLoopEvent = CustomEvent<{
    trackId: string;
}>

export default class TrackLoopsElement extends LightningElement {
    @api track: AudioTrack;

    get trackLoops() {
        return this.track.loops.toList().toArray();
    }

    onCreateTrackLoopClick(evt) {
        const event: CreateTrackLoopEvent = new CustomEvent('createtrackloop', {
            bubbles: true,
            composed: true,
            detail: {
                trackId: this.track.id,
            }
        });

        this.dispatchEvent(event);
    }
}
