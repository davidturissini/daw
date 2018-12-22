import { LightningElement, api, track, wire } from 'lwc';
import { AudioTrackState } from './../../wire/audiotracks';
import { editorSym } from './../../wire/editor';

const editor = Symbol();

export default class AudioTrack extends LightningElement {
    @wire(editorSym, {})
    onEditor(editor) {
        if (editor.data.frame) {
            const px = editor.data.timeToPixel(this.track.offset);
            this.template.host.style.transform = `translateX(${px}px)`;
        }
    }

    @track dup = false;
    @api track;

    get isLoading() {
        return this.track.state === AudioTrackState.LOADING;
    }

    connectedCallback() {

    }
}
