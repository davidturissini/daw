import { LightningElement, api, track } from 'lwc';
import { timeToPixel, durationToWidth, Rect } from 'util/geometry';
import { Time, Beat, createBeat } from 'util/time';
import { AudioRange, BeatRange } from 'util/audiorange';
import { Tempo } from 'store/project';
import { mapBeatMarks } from 'store/audiowindow';
import { Color } from 'util/color';

export interface TimeElement extends HTMLElement {
    time: Time;
}

export type TimeChangeEvent = CustomEvent<{
    time: Time;
}>

export type AudioWindowRectChangeEvent = CustomEvent<{
    rect: Rect;
    globalRect: Rect;
}>

function isTimeElement(elm: HTMLElement): elm is TimeElement {
    return 'time' in elm;
}

export interface AudioRangeElement extends HTMLElement {
    range: AudioRange | BeatRange;
}

export type AudioRangeElementChange = CustomEvent<{
    range: AudioRange | BeatRange
}>

export function isAudioRangeElement(elm: HTMLElement): elm is AudioRangeElement {
    return 'range' in elm;
}

function flattenAssignedElements<T extends HTMLElement>(slotElm: HTMLSlotElement, filter: (elm: HTMLElement) => elm is T): T[] {
    return slotElm.assignedElements().reduce((seed: T[], assignedElm: HTMLElement) => {
        if (assignedElm.tagName.toLowerCase() === 'slot') {
            return seed.concat(flattenAssignedElements<T>(assignedElm as HTMLSlotElement, filter))
        }

        if (filter(assignedElm)) {
            seed.push(assignedElm);
        }
        return seed;
    }, []);
}

function calcAudioRangeStyle(rect: Rect, visibleRange: AudioRange, range: AudioRange) {
    const frameWidth = rect.width;
    const segmentOffset = timeToPixel(rect, visibleRange, range.start);
    let width = durationToWidth(rect, visibleRange, range.duration);

    const x = segmentOffset;
    if (x < 0) {
        width += x;
    }

    if (width + x > frameWidth) {
        const diff = (width + x) - frameWidth;
        width = width - diff;
    }
    return {
        transform: `translate3d(${Math.max(x, 0)}px, 0px, 0)`,
        width: `${width}px`,
    };
}

export default class AudioWindowElement extends LightningElement {
    @api tempo: Tempo;
    @api showGrid: boolean = false;
    @api resolution: Beat = createBeat(1 / 4);
    @track rect: Rect | null = null;
    @track globalRect: Rect | null = null;
    @track internalRange: AudioRange;

    @api
    get range() {
        return this.internalRange;
    }

    set range(value: AudioRange) {
        this.internalRange = {
            start: value.start,
            duration: value.duration,
        };
        this.cursorChildren.forEach((child) => {
            this.drawElementStyle(child);
        });
        this.rangeChildren.forEach((child) => {
            this.drawRangeElementStyle(child);
        });
    }

    drawElementStyle(elm: TimeElement) {
        const { rect, range } = this;
        if (!rect) {
            return;
        }

        const px = timeToPixel(rect, range, elm.time);
        elm.style.transform = `translateX(${px}px)`;
    }

    drawRangeElementStyle(elm: AudioRangeElement) {
        const { range, rect } = this;
        if (!rect) {
            return;
        }
        const { width, transform } = calcAudioRangeStyle(rect, range, elm.range.toAudioRange(this.tempo));
        elm.style.width = width;
        elm.style.transform = transform;
    }

    renderTimeElementStyles(children: TimeElement[]) {
        children.forEach(this.drawElementStyle, this);
    }

    cursorChildren: TimeElement[] = [];
    rangeChildren: AudioRangeElement[] = [];
    onSlotChange(evt) {
        const target = evt.target as HTMLSlotElement;
        const { cursorChildren, rangeChildren } = this;
        const flattenedChildren = this.cursorChildren = flattenAssignedElements<TimeElement>(target, isTimeElement);
        const flattenedRangeChildren = this.rangeChildren = flattenAssignedElements<AudioRangeElement>(target, isAudioRangeElement);

        flattenedChildren.forEach((child) => {
            if (cursorChildren.indexOf(child) === -1) {
                this.drawElementStyle(child);
            }
        });

        flattenedRangeChildren.forEach((child) => {
            if (rangeChildren.indexOf(child) === -1) {
                this.drawRangeElementStyle(child);
            }
        });
    };

    onRangeChange(evt: AudioRangeElementChange) {
        const target = evt.target as HTMLElement;
        if(isAudioRangeElement(target)) {
            this.drawRangeElementStyle(target);
        }
    }

    onTimeChange(evt: TimeChangeEvent) {
        const target = evt.target as HTMLElement;
        if(isTimeElement(target)) {
            this.drawElementStyle(target);
        }
    }

    setRect(rect: Rect, globalRect: Rect) {
        this.rect = rect;
        this.globalRect = globalRect;
        const event: AudioWindowRectChangeEvent = new CustomEvent('rectchange', {
            bubbles: true,
            composed: false,
            detail: {
                rect,
                globalRect,
            }
        });

        this.dispatchEvent(event);
    }

    get gridLines(): Array<{ time: Time, color: Color, style: string }> {
        const { range, tempo, rect, resolution } = this;
        if (!rect) {
            return [];
        }
        return mapBeatMarks<{ time: Time, color: Color, style: string }>(range, resolution, tempo, (beat: Beat, time: Time) => {
            const px = timeToPixel(rect, range, time);
            return {
                style: `transform: translateX(${px}px)`,
                color: new Color(56, 56, 56),
                time
            };
        });
    }

    renderedCallback() {
        if (!this.rect) {
            requestAnimationFrame(() => {
                const rect = this.getBoundingClientRect();
                const host = this.template.host! as HTMLElement;
                const localRect = {
                    height: host.offsetHeight,
                    width: host.offsetWidth,
                    x: host.offsetLeft,
                    y: host.offsetTop,
                };

                const globalRect = {
                    height: rect.height,
                    width: rect.width,
                    x: rect.left,
                    y: rect.top,
                };
                this.setRect(localRect, globalRect);
                this.cursorChildren.forEach((child) => {
                    this.drawElementStyle(child);
                });
            });
        }
    }
}
