import { LightningElement, api } from 'lwc';

export enum IconVariants {
    EditPencil = 'fas fa-pen',
    HandPaper = 'fas fa-hand-paper',
    Times = 'fas fa-times',
    TrackList = 'fas fa-list-ul',
    Columns = 'fas fa-columns',
    Play = 'fas fa-play',
    GripLines = 'fas fa-grip-lines',
}

export default class IconElement extends LightningElement {
    @api variant: string;

    get iconClassName() {
        return IconVariants[this.variant];
    }
}
