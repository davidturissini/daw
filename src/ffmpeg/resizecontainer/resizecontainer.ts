import { LightningElement, api, track } from 'lwc';
import { Frame } from 'util/geometry';
import interactjs, { Interactable } from 'interactjs';
import rafThrottle from 'raf-throttle';

const RESIZER_HEIGHT = 10;

const parentFrameSym = Symbol();
const topPercentSym = Symbol();
const bottomPercentSym = Symbol();

export default class ResizeContainerElement extends LightningElement {
    [topPercentSym]: number = 1;

    @track
    [bottomPercentSym]: number = 0;

    resizeInteract: Interactable | null = null;

    @api
    set parentFrame(value: Frame | null) {
        if (value !== null) {
            this.applyTopSlotStyle(value);
            this.applyBottomSlotStyle(value);
        }
        this[parentFrameSym] = value;
    }

    get parentFrame() {
        return this[parentFrameSym];
    }

    set topPercent(value: number) {
        this[topPercentSym] = value;
        if (this.parentFrame) {
            this.applyTopSlotStyle(this.parentFrame);
        }
    }

    get topPercent() {
        return this[topPercentSym]
    }

    set bottomPercent(value: number) {
        this[bottomPercentSym] = value;
        if (this.parentFrame) {
            this.applyBottomSlotStyle(this.parentFrame);
        }
    }

    get bottomPercent() {
        return this[bottomPercentSym]
    }

    applySlotStyle(element: HTMLElement | null, height: number) {
        if (element === null) {
            return;
        }
        element.style.height = `${height}px`;
    }

    /*
     *
     *  Main (Top) slot
     *
     */
    mainSlotElement: HTMLElement | null = null;
    onMainSlotChange(evt) {
        const target = evt.target as HTMLSlotElement;
        const assignedElements = target.assignedElements() as HTMLElement[];
        const elm = this.mainSlotElement = assignedElements[0] || null;

        if (elm) {
            elm.style.boxSizing = 'border-box';
        }
        if (this.parentFrame) {
            this.applyTopSlotStyle(this.parentFrame);
        }
    }

    applyTopSlotStyle(frame: Frame) {
        this.applySlotStyle(this.mainSlotElement, this.mainSlotHeight(frame));
    }

    mainSlotHeight(frame: Frame) {
        return Math.ceil(frame.height * this.topPercent);
    }

    /*
     *
     *  Bottom  slot
     *
     */
    bottomSlotElement: HTMLElement | null = null;
    onBottomSlotChange(evt) {
        const target = evt.target as HTMLSlotElement;
        const assignedElements = target.assignedElements() as HTMLElement[];
        const elm = this.bottomSlotElement = assignedElements[0] || null;
        if (elm) {
            elm.style.boxSizing = 'border-box';
        }
        if (elm) {
            const { parentFrame } = this;
            if (parentFrame) {
                const { offsetHeight } = elm;
                let bottomPercent = offsetHeight / parentFrame.height;
                if (bottomPercent > 0.5) {
                    bottomPercent = 0.5
                }
                this.topPercent = 1 - bottomPercent;
                this.bottomPercent = bottomPercent
            } else {
                this.topPercent = 0.5;
                this.bottomPercent = 0.5;
            }
        }
    }

    bottomContainerHeight(frame: Frame): number {
        if (this.parentFrame === null) {
            return 0;
        }
        return Math.floor(this.parentFrame.height * this.bottomPercent - RESIZER_HEIGHT);
    }

    applyBottomSlotStyle(frame: Frame) {
        this.applySlotStyle(this.bottomSlotElement, this.bottomContainerHeight(frame));
    }

    hasResizer() {
        return this.bottomPercent > 0;
    }

    onResizerDrag = rafThrottle((evt) => {
        if (!this.parentFrame) {
            return;
        }
        const { dy } = evt;
        const percent = dy / this.parentFrame.height;
        this.topPercent += percent;
        this.bottomPercent -= percent;
    })

    renderedCallback() {
        if (!this.resizeInteract) {
            this.resizeInteract = interactjs(this.template.querySelector('.resizer')).draggable({
                axis: 'y',
                onmove: this.onResizerDrag,
            });
        }
    }

    disconnectedCallback() {
        if (this.resizeInteract) {
            (this.resizeInteract as any).unset();
        }
    }
}
