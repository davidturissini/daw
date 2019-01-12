import { BaseState } from './base';
import { highlightSilences } from './../../../wire/highlight';

export class HighlightSilencesState extends BaseState {
    constructor(range) {
        super();
        this.range = range;
    }

    enter() {
        highlightSilences(this.range);
    }
}
