import { LightningElement, api } from 'lwc';
import { IconVariants } from 'cmp/icon/icon';
import { Color } from 'util/color';

export default class ButtonElement extends LightningElement {
    @api iconVariant: IconVariants | null = null;
    @api selected: boolean = false;
    @api buttonColor: Color | null;
    @api textColor: Color | null;

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
        const { buttonColor, textColor } = this;
        const styles: string[] = [];
        if (buttonColor) {
            styles.push(`background: ${buttonColor.rgb()}`);
        }
        if (textColor) {
            styles.push(`color: ${textColor.rgb()}`);
        }
        return styles.join(';');
    }
}
