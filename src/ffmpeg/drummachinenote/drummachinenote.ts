import { LightningElement, api } from 'lwc';
import { tickRangeCreatedEvent } from 'event/tickrangecreatedevent';
import { TickRange } from 'store/tick';
import { PianoKey } from 'util/sound';
import { generateId } from 'util/uniqueid';
import { tickRangeDeletedEvent } from 'event/tickrangedeletedevent';

export default class DrumMachineTick extends LightningElement {
    @api range: TickRange;
    @api pianoKey: PianoKey;
    @api noteId?: string;
    get divStyle(): string {
        if (this.noteId) {
            return `background: red`;
        }
        return 'background: white';
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
