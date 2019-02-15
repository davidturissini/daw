import { LightningElement, api } from 'lwc';
import { PianoKey } from 'util/sound';
import { TickRange, Tick, pixelToTick, tickZero } from 'store/tick';
import { Rect } from 'util/geometry';
import { Tempo } from 'store/project';
import interactjs, { Interactable } from 'interactjs';
import { MidiNoteRangeChangedEvent, midiNoteRangeChangedEvent } from 'event/midinoterangechangedevent';
import { MidiNoteDeletedEvent, midiNoteDeletedEvent } from 'event/midinotedeletedevent';
import { Color } from 'util/color';


export default class MidiNoteElement extends LightningElement {
    @api pianoKey: PianoKey;
    @api noteId?: string;
    @api range: TickRange;
    @api parentVisibleRange: TickRange;
    @api parentRect: Rect;
    @api quanitizeResolution: Tick;
    @api tempo: Tempo;
    @api color: Color | null = null;
    @api noDrag: boolean = false;

    interactable: Interactable | null = null;

    get buttonStyle() {
        let { color } = this;
        if (!color) {
            color = new Color(88, 197, 253);
        }
        return `background: ${color.rgb()}`;
    }

    onButtonKeyUp(evt: KeyboardEvent) {
        switch (evt.which) {
            case 8:
                // ESC
                const { noteId } = this;
                if (noteId) {
                    const deleteEvent: MidiNoteDeletedEvent = midiNoteDeletedEvent(this.pianoKey, noteId);
                    this.dispatchEvent(deleteEvent);
                }
                break;
        }
    }

    renderedCallback() {
        if (!this.interactable) {
            // Even if "noDrag" prop is false,
            // We have to hookup the interactable
            // because we need to capture the event before it reaches the audio window
            this.interactable = interactjs(this.template.querySelector('.container')).draggable({
                onmove: (evt) => {
                    const { noteId, noDrag } = this;
                    if (!noteId || noDrag === true) {
                        return;
                    }
                    const delta = pixelToTick(this.parentRect, this.parentVisibleRange, evt.dx);
                    const event: MidiNoteRangeChangedEvent = midiNoteRangeChangedEvent({
                        key: this.pianoKey,
                        noteId,
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
