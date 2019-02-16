import { LightningElement, api } from 'lwc';
import { Color } from 'util/color';
import interactjs, { Interactable } from 'interactjs';
import { Rect } from 'util/geometry';
import { TickRange, pixelToTick, Tick, tickPlus } from 'store/tick';
import { MarkerTickChangedEvent, markerTickChangedEvent } from 'event/markertickchanged';
import { Tempo } from 'store/project';

export default class MarkerCaret extends LightningElement {
    @api color: Color;
    @api markerId: string;
    @api parentRect: Rect;
    @api parentVisibleRange: TickRange;
    @api quanitizeResolution: Tick;
    @api tick: Tick;
    @api tempo: Tempo;

    get caretStyle() {
        return `border-right-color: ${this.color.rgb()}`;
    }

    dragInteractable?: Interactable;
    renderedCallback() {
        if (!this.dragInteractable) {
            let startTick: Tick
            this.dragInteractable = interactjs(this.template.querySelector('.caret')).draggable({
                onstart: () => {
                    startTick = this.tick;
                },
                onmove: (evt) => {
                    let delta = pixelToTick(this.parentRect, this.parentVisibleRange, evt.dx);
                    const nextTick = tickPlus(startTick, delta);

                    const event: MarkerTickChangedEvent = markerTickChangedEvent(this.markerId, nextTick, this.quanitizeResolution, this.tempo);
                    startTick = nextTick;
                    this.dispatchEvent(event);
                }
            })
        }
    }
}
