import { LightningElement, api } from 'lwc';
import { IconVariants } from 'cmp/icon/icon';
import { Color } from 'util/color';

export default class ButtonElement extends LightningElement {
    @api iconVariant: IconVariants | null = null;
    @api selected: boolean = false;
    @api buttonColor: Color | null;
    @api textColor: Color | null;
    @api value: any;
    @api square: boolean = false;

    get buttonClassName() {
        const classes: string[] = [];
        if (this.selected) {
            classes.push('selected');
        }
        if (this.square) {
            classes.push('button--square');
        }
        return classes.join(' ');
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
