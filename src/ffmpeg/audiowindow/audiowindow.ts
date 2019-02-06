import { LightningElement, api } from 'lwc';
import { AudioWindow } from 'cmp/grid/grid';
import { timeToPixel, durationToWidth } from 'util/geometry';
import { Time } from 'util/time';
import { AudioRange, BeatRange } from 'util/audiorange';
import { Tempo } from 'store/project';

export interface TimeElement extends HTMLElement {
    time: Time;
}

export type TimeChangeEvent = CustomEvent<{
    time: Time;
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

function calcAudioRangeStyle(audioWindow: AudioWindow, range: AudioRange) {
    const { rect, visibleRange } = audioWindow;
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
    @api audioWindow: AudioWindow;
    @api tempo: Tempo;

    drawElementStyle(elm: TimeElement) {
        const { audioWindow } = this;
        const px = timeToPixel(audioWindow.rect, audioWindow.visibleRange, elm.time);
        elm.style.transform = `translateX(${px}px)`;
    }

    drawRangeElementStyle(elm: AudioRangeElement) {
        const { audioWindow } = this;
        const { width, transform } = calcAudioRangeStyle(audioWindow, elm.range.toAudioRange(this.tempo));
        elm.style.width = width;
        elm.style.transform = transform;
    }

    renderTimeElementStyles(children: TimeElement[]) {
        children.forEach(this.drawElementStyle, this);
    }

    cursorChildren: TimeElement[] = [];
    onCursorSlotChange(evt) {
        const target = evt.target as HTMLSlotElement;
        const flattenedChildren = flattenAssignedElements<TimeElement>(target, isTimeElement);
        const { cursorChildren } = this;
        this.cursorChildren = flattenedChildren;

        flattenedChildren.forEach((child) => {
            if (cursorChildren.indexOf(child) === -1) {
                this.drawElementStyle(child);
            }
        });
    };

    rangeChildren: AudioRangeElement[] = [];
    onRangeSlotChange(evt) {
        const target = evt.target as HTMLSlotElement;
        const flattenedChildren = flattenAssignedElements<AudioRangeElement>(target, isAudioRangeElement);
        const { rangeChildren } = this;
        this.rangeChildren = flattenedChildren;

        flattenedChildren.forEach((child) => {
            if (rangeChildren.indexOf(child) === -1) {
                this.drawRangeElementStyle(child);
            }
        });
    }

    onRangeChange(evt: AudioRangeElementChange) {
        const target = evt.target as HTMLElement;
        if(isAudioRangeElement(target)) {
            console.log('drawing?')
            this.drawRangeElementStyle(target);
        }
    }

    renderedCallback() {
        this.cursorChildren.forEach((child) => {
            this.drawElementStyle(child);
        });
    }
}
