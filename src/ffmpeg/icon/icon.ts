import { LightningElement, api } from 'lwc';

export enum IconVariants {
    EditPencil = 'fas fa-pen',
    HandPaper = 'far fa-hand-paper'
}

export default class IconElement extends LightningElement {
    @api variant: string;

    get iconClassName() {
        return IconVariants[this.variant];
    }
}
