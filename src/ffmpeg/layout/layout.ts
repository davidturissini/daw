import { LightningElement, track, api } from 'lwc';
import interactjs, { Interactable } from 'interactjs';

const SPACER_HEIGHT = 5;
const SPACER_WIDTH = SPACER_HEIGHT;

export default class ResizeContainerElement extends LightningElement {
    leftColInteractable: Interactable | null = null;
    bottomRowInteractable: Interactable | null = null;
    rightColInteractable: Interactable | null = null;

    @track leftColCollapsed = false;
    @track bottomRowCollapsed = false;
    @track rightColCollapsed = false;

    @track leftColumnWidth = 250;
    @track bottomRowHeight = 200;
    @track rightColumnWidth = 250;

    @api bottomRowMinHeight: number = 200;
    @api leftColMinWidth: number = 250;
    @api rightColMinWidth: number = 250;

    get containerStyle() {
        const computedLeftColumnWidth = this.leftColCollapsed ? SPACER_WIDTH : this.leftColumnWidth;
        const computedBottomRowHeight = this.bottomRowCollapsed ? SPACER_HEIGHT : this.bottomRowHeight;
        const computedRightColumnWidth = this.rightColCollapsed ? SPACER_HEIGHT : this.rightColumnWidth;

        const styles = [
            `grid-template-rows: auto 100fr ${computedBottomRowHeight}px`,
            `grid-template-columns: ${computedLeftColumnWidth}px 100fr ${computedRightColumnWidth}px`
        ]
        return styles.join(';');
    }

    onCellSlotChange(evt) {
        const target = evt.target as HTMLSlotElement;

        target.assignedElements().forEach((elm: HTMLElement) => {
            elm.style.position = 'absolute';
            elm.style.left = '0';
            elm.style.top = '0';
            elm.style.right = '0';
            elm.style.bottom = '0';
            elm.style.zIndex = '1';
        });
    }

    renderedCallback() {
        if (this.leftColInteractable === null) {
            const elm = this.template.querySelector('.left-col-resizer');
            this.leftColInteractable = interactjs(elm).draggable({
                axis: 'x',
                onmove: (evt) => {
                    if (this.leftColCollapsed === true) {
                        return;
                    }
                    let next = this.leftColumnWidth + evt.dx;
                    if (next < this.leftColMinWidth) {
                        next = this.leftColMinWidth;
                    }
                    this.leftColumnWidth = next;
                }
            })
            .on('doubletap', (evt) => {
                this.leftColCollapsed = !this.leftColCollapsed;
            });
        }

        if (this.bottomRowInteractable === null) {
            this.bottomRowInteractable = interactjs(this.template.querySelector('.bottom-row-resizer')).draggable({
                axis: 'y',
                onmove: (evt) => {
                    if (this.bottomRowCollapsed === true) {
                        return;
                    }
                    let next = this.bottomRowHeight + -evt.dy;
                    if (next < this.bottomRowMinHeight) {
                        next = this.bottomRowMinHeight;
                    }
                    this.bottomRowHeight = next;
                }
            })
            .on('doubletap', (evt) => {
                this.bottomRowCollapsed = !this.bottomRowCollapsed;
            });
        }

        if (this.rightColInteractable === null) {
            this.rightColInteractable = interactjs(this.template.querySelector('.right-col-resizer')).draggable({
                axis: 'y',
                onmove: (evt) => {
                    if (this.rightColCollapsed === true) {
                        return;
                    }
                    let next = this.rightColumnWidth + -evt.dx;
                    if (next < this.rightColMinWidth) {
                        next = this.rightColMinWidth;
                    }

                    this.rightColumnWidth = next;
                }
            })
            .on('doubletap', (evt) => {
                this.rightColCollapsed = !this.rightColCollapsed;
            });
        }
    }
}
