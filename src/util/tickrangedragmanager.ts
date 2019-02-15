import { Tick, TickRange, absolutePixelToTick, pixelToTick } from "store/tick";
import { Rect, Origin } from "./geometry";
import interactjs from 'interactjs';

export interface TickRangeDragManagerDelegate {
    mouseDown: (tick: Tick, origin: Origin) => void;
    mouseMove: (delta: Tick, origin: Origin) => void;
    mouseUp: () => void;
}

export class TickRangeDragManager {
    rect: Rect;
    previousX?: number;
    origin?: Origin;
    visibleRange: TickRange;
    delegate: TickRangeDragManagerDelegate;
    constructor(rect: Rect, visibleRange: TickRange, delegate: TickRangeDragManagerDelegate) {
        this.rect = rect;
        this.visibleRange = visibleRange;
        this.delegate = delegate;
    }

    mouseDown(evt: MouseEvent) {
        const { rect, visibleRange } = this;
        const x = evt.x - rect.x;
        const y = evt.y - rect.y;
        const origin = this.origin = {
            x,
            y,
        };

        this.previousX = x;
        const tick = absolutePixelToTick(rect, visibleRange, x);
        this.delegate.mouseDown(tick, origin);
    }

    mouseMove(evt: MouseEvent) {
        const { rect, visibleRange, previousX, origin } = this;
        if (previousX === undefined || origin === undefined) {
            return;
        }

        const x = (evt.x - rect.x) - previousX;
        this.previousX = (evt.x - rect.x);
        const delta = pixelToTick(rect, visibleRange, x);
        this.delegate.mouseMove(delta, origin);
    }
    mouseUp(evt: MouseEvent) {
        console.log('mouseup?')
        this.origin = undefined;
        this.previousX = undefined;
    }

}
