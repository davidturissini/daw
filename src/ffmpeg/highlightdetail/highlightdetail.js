import { LightningElement, api } from 'lwc';
import { deleteRange, collapseRange } from './../../wire/audiotrack';
import { clearHighlight } from './../../wire/highlight';

export default class HighlightDetail extends LightningElement {
    @api highlight;

    onCollapseClick() {
        collapseRange(this.highlight.range);
        clearHighlight(this.highlight.id);
    }

    onDeleteClick() {
        deleteRange(this.highlight.range);
        clearHighlight(this.highlight.id);
    }

    onClearClick() {
        clearHighlight(this.highlight.id);
    }
}
