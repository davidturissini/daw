import { LightningElement, api } from 'lwc';
import { PianoKey } from 'util/sound';
import { TickRange, Tick, pixelToTick, tickZero } from 'store/tick';
import { Rect } from 'util/geometry';
import { Tempo } from 'store/project';
import interactjs, { Interactable } from 'interactjs';
import { MidiNoteRangeChangedEvent, midiNoteRangeChangedEvent } from 'event/midinoterangechangedevent';


export default class MidiNoteElement extends LightningElement {
    @api pianoKey: PianoKey;
    @api noteId: string;
    @api range: TickRange;
    @api parentVisibleRange: TickRange;
    @api parentRect: Rect;
    @api quanitizeResolution: Tick;
    @api tempo: Tempo;

    interactable: Interactable | null = null;

    renderedCallback() {
        if (!this.interactable) {
            this.interactable = interactjs(this.template.querySelector('.container')).draggable({
                onmove: (evt) => {
                    const delta = pixelToTick(this.parentRect, this.parentVisibleRange, evt.dx);
                    const event: MidiNoteRangeChangedEvent = midiNoteRangeChangedEvent({
                        key: this.pianoKey,
                        noteId: this.noteId,
                        currentRange: this.range,
                        durationDelta: tickZero,
                        quanitizeResolution: this.quanitizeResolution,
                        tempo: this.tempo,
                        startDelta: delta,
                    });
                    this.dispatchEvent(event);
                },
            })
        }
    }

    disconnectedCallback() {
        if (this.interactable) {
            (this.interactable as any).unset();
        }
    }

}
