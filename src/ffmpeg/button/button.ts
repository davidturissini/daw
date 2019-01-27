import { LightningElement, api } from 'lwc';
import { IconVariants } from 'cmp/icon/icon';

export default class ButtonElement extends LightningElement {
    @api iconVariant: IconVariants;
    @api selected: boolean = false;

    get buttonClassName() {
        if (this.selected) {
            return 'selected';
        }
        return '';
    }
}
