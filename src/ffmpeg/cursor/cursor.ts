import { LightningElement, api } from 'lwc';
import { Color } from 'util/color';

export default class CursorElement extends LightningElement {
    @api dashed: boolean = false;
    @api color: Color | null = null;

    get lineClassName() {
        let base = 'line'
        if (this.dashed) {
            return `${base} line--dashed`;
        }
        return base;
    }

    get lineStyles() {
        const color = this.color || new Color(117, 117, 117);
        return `border-color: ${color.rgb()}`;
    }
}
