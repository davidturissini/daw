import { LightningElement, api } from 'lwc';
import { tickRangeCreatedEvent } from 'event/audiowindowdragevent';
import { TickRange } from 'store/tick';
import { PianoKey } from 'util/sound';
import { generateId } from 'util/uniqueid';
import { tickRangeDeletedEvent } from 'event/tickrangedeletedevent';

export default class DrumMachineTick extends LightningElement {
    @api range: TickRange;
    @api pianoKey: PianoKey;
    @api noteId?: string;
    @api isPlaying: boolean;
    get divClass(): string {
        const classNames: string[]= [];
        if (this.noteId) {
            classNames.push('active');
        }
        if (this.isPlaying) {
            classNames.push('playing');
        }

        return classNames.join(' ');
    }

    onDivClick() {
        const { noteId } = this;
        if (!noteId) {
            const event = tickRangeCreatedEvent<PianoKey>(this.pianoKey, generateId(), this.range);
            this.dispatchEvent(event);
            return;
        }
        const event = tickRangeDeletedEvent<PianoKey>(this.pianoKey, noteId);
        this.dispatchEvent(event);
    }
}
