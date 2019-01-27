import { LightningElement, api } from 'lwc';

export enum IconVariants {
    EditPencil = 'fas fa-pen',
    HandPaper = 'fas fa-hand-paper',
    Times = 'fas fa-times',
}

export default class IconElement extends LightningElement {
    @api variant: string;

    get iconClassName() {
        return IconVariants[this.variant];
    }
}
