import { LightningElement, api } from 'lwc';
import { tickRangeCreatedEvent } from 'event/tickrangecreatedevent';
import { TickRange } from 'store/tick';
import { PianoKey } from 'util/sound';
import { generateId } from 'util/uniqueid';

export default class DrumMachineTick extends LightningElement {
    @api active: boolean;
    @api range: TickRange;
    @api pianoKey: PianoKey;
    get divStyle(): string {
        if (this.active) {
            return `background: red`;
        }
        return 'background: white';
    }

    onDivClick() {
        const event = tickRangeCreatedEvent<PianoKey>(this.pianoKey, generateId(), this.range);
        this.dispatchEvent(event);
    }
}
