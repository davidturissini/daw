import { BaseState } from './base';
import { SelectState } from './select';

export class MetaKeyDownState extends BaseState {
    onEditorMouseDown(app, evt) {
        app.enterState(new SelectState(evt.offsetX, evt.offsetY));
    }
}
