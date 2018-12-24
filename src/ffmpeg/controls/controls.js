import { LightningElement, wire } from 'lwc';
import { editorSym } from './../../wire/editor';
import { audioTracks } from './../../wire/audiotrack';
import { audioSources } from './../../wire/audiosource';
import { play } from './../../wire/playhead';
import { Time } from './../../util/time';

export default class Controls extends LightningElement {
    @wire(editorSym, {})
    editor;

    @wire(audioTracks, {})
    audioTracks

    @wire(audioSources, {})
    audioSources

    onPlayClick() {
        play(
            this.editor.data.cursor,
            new Time(2000),
            this.audioTracks.data,
            this.audioSources.data
        );
    }
}
