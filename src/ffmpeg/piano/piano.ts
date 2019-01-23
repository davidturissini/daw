import { LightningElement, api, wire } from 'lwc';
import { notes } from 'util/sound';
import { wireSymbol } from 'store/index';
import { PianoState } from 'store/piano/reducer';
import { Piano } from 'store/piano';

export type PianoMouseDownEvent = CustomEvent<{
    name: string;
    frequency: number;
    pianoId: string;
}>

export type PianoMouseEnterEvent = CustomEvent<{
    name: string;
    frequency: number;
    pianoId: string;
}>

export type PianoMouseLeaveEvent = CustomEvent<{
    name: string;
    frequency: number;
    pianoId: string;
}>

const { keys } = Object;
const notesView: Array<{ name: string; frequency: number }> = keys(notes).map((key) => {
    const note = notes[key];
    const classNames = ['key'];
    if (note.sharp === true) {
        classNames.push('key--sharp');
    }
    return {
        name: key,
        frequency: note.frequency,
        className: classNames.join(' '),
    };
});

export default class PianoElement extends LightningElement {
    @api pianoId: string;

    @wire(wireSymbol, {
        paths: {
            pianos: ['piano', 'items']
        }
    })
    storeData: {
        data: {
            pianos: PianoState['items'];
        }
    }

    get piano(): Piano {
        return this.storeData.data.pianos.get(this.pianoId) as Piano;
    }

    get notes(): Array<{ name: string; frequency: number }> {
        return notesView;
    }

    onKeyMouseLeave(evt: MouseEvent) {
        evt.stopPropagation();
        const target = (evt.target as Element);
        const noteName = target.getAttribute('data-note-name') as string;
        const note = notes[noteName];

        const event: PianoMouseEnterEvent = new CustomEvent('pianomouseleave', {
            bubbles: true,
            composed: true,
            detail: {
                pianoId: this.pianoId,
                name: noteName,
                frequency: note.frequency,
            }
        });
        this.dispatchEvent(event);
    }

    onKeyMouseEnter(evt: MouseEvent) {
        evt.stopPropagation();
        const target = (evt.target as Element);
        const noteName = target.getAttribute('data-note-name') as string;
        const note = notes[noteName];

        const event: PianoMouseEnterEvent = new CustomEvent('pianomouseenter', {
            bubbles: true,
            composed: true,
            detail: {
                pianoId: this.pianoId,
                name: noteName,
                frequency: note.frequency,
            }
        });
        this.dispatchEvent(event);
    }

    onKeyMouseDown(evt: MouseEvent) {
        evt.stopPropagation();
        const target = (evt.target as Element);
        const noteName = target.getAttribute('data-note-name') as string;
        const note = notes[noteName];

        const event: PianoMouseDownEvent = new CustomEvent('pianomousedown', {
            bubbles: true,
            composed: true,
            detail: {
                pianoId: this.pianoId,
                name: noteName,
                frequency: note.frequency,
            }
        });
        this.dispatchEvent(event);
    }
}
