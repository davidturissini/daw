import { LightningElement, api, track } from 'lwc';
import { Frame } from 'util/geometry';
import interactjs, { Interactable } from 'interactjs';
import rafThrottle from 'raf-throttle';

const RESIZER_HEIGHT = 10;

export default class ResizeContainerElement extends LightningElement {
    @api parentFrame: Frame | null;
    @track hasBottomContents: boolean = false;
    @track topPercent: number = 0.5;
    @track bottomPercent: number = 0.5;

    resizeInteract: Interactable | null = null;

    onMainSlotChange(evt) {
        const target = evt.target as HTMLSlotElement;
        const assignedElements = target.assignedElements() as HTMLElement[];
        assignedElements.forEach((elm) => {
            elm.style.height = '100%';
        });
    }

    onBottomSlotChange(evt) {
        const target = evt.target as HTMLSlotElement;
        const assignedElements = target.assignedElements() as HTMLElement[];
        if (assignedElements.length > 0) {
            assignedElements.forEach((elm) => {
                elm.style.height = '100%';
            });
            this.hasBottomContents = true;
        } else {
            this.hasBottomContents = false;
        }
    }

    get bottomContainerStyle() {
        if (this.parentFrame === null) {
            return '';
        }
        if (this.hasBottomContents === false) {
            return 'display: none';
        } else {
            const height = Math.floor(this.parentFrame.height * this.bottomPercent - RESIZER_HEIGHT);
            return `display: block; height: ${height}px`
        }
    }

    get containerStyle() {
        if (this.parentFrame === null) {
            return '';
        }

        if (this.hasBottomContents === false) {
            return `height: ${this.parentFrame.height}px`
        }
        const height = Math.ceil(this.parentFrame.height * this.topPercent);
        return `height: ${height}px`
    }

    get resizerStyle() {
        if (this.hasBottomContents === false) {
            return 'display: none';
        }
        return 'display: flex;'
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
