import { LightningElement, api } from 'lwc';
import { Color } from 'util/color';

export type ButtonGroupValueChangeEvent<T> = CustomEvent<{
    value: T;
}>;

export interface ButtonGroupButton<T> {
    value: T;
    iconVariant?: string;
    text?: string;
}

export default class ButtonGroup<T> extends LightningElement {
    @api buttons: ButtonGroupButton<any>[];
    @api value: T;

    onButtonClick(evt) {
        const event: ButtonGroupValueChangeEvent<T> = new CustomEvent('change', {
            bubbles: true,
            composed: false,
            detail: {
                value: evt.target.value,
            }
        });
        this.dispatchEvent(event);
    }

    get buttonViewModels() {
        return this.buttons.map((button: ButtonGroupButton<any>) => {
            return {
                color: button.value === this.value ? new Color(47, 97, 147) : null,
                value: button.value,
                iconVariant: button.iconVariant,
                text: button.text,
            }
        })
    }
}
