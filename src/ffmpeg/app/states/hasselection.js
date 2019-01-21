import { BaseState } from './base';
import { IdleState } from './idle';
import {
    clearSelections,
    deleteSelections,
} from './../../../wire/selection';
import {
    highlightRange,
} from './../../../wire/highlight';

export class HasSelectionState extends BaseState {
    constructor(range) {
        super();
        this.selectionRange = range;
    }

    goToIdleState(app) {
        app.enterState(new IdleState());
    }

    onDocumentKeyDown(app, evt) {
        // CMD + H
        if (evt.which === 72 && evt.metaKey) {
            evt.preventDefault();
            highlightRange(this.selectionRange);
            this.goToIdleState(app);
        }
    }

    onDocumentKeyUpEsc(app) {
        deleteSelections();
        this.goToIdleState(app);
    }

    onDocumentMouseUp(app) {
        clearSelections();
        requestAnimationFrame(() => {
            this.goToIdleState(app);
        });
    }
}
