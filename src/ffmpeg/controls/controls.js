import { LightningElement, wire } from 'lwc';
import { editorSym } from './../../wire/editor';
import { play } from './../../wire/playhead';

export default class Controls extends LightningElement {
    @wire(editorSym, {})
    editor;

    onPlayClick() {

    }
}
