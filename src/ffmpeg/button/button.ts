import { LightningElement, api } from 'lwc';
import { IconVariants } from 'cmp/icon/icon';
import { Color } from 'util/color';

export default class ButtonElement extends LightningElement {
    @api iconVariant: IconVariants | null = null;
    @api selected: boolean = false;
    @api buttonColor: Color | null;

    get buttonClassName() {
        if (this.selected) {
            return 'selected';
        }
        return '';
    }

    get hasIconVariant() {
        return this.iconVariant !== null;
    }

    get buttonStyle() {
        const { buttonColor } = this;
        if (buttonColor) {
            return `background: ${buttonColor.rgb()}`;
        }
        return '';
    }
}
