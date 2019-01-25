import { LightningElement, api, wire } from 'lwc';
import { notes } from 'util/sound';
import { wireSymbol } from 'store/index';
import { PianoState } from 'store/piano/reducer';
import { Piano } from 'store/piano';
import { Frame } from 'util/geometry';

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

const notesSym = Symbol();

export default class PianoElement extends LightningElement {
    @api pianoId: string;
    octaveFrames: { [key: string]: Frame };

    @api
    set notes(value: Array<{ sharp: boolean, height: number, name: string }>) {
        const frames = value.reduce((seed, note) => {
            const frame: Frame = {
                height: note.sharp === true ? note.height : note.height / 2,
                width: 0,
            }
        });
        console.log(frames);
        this[notesSym] = value;
    }

    get notes() {
        return this[notesSym];
    }


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

    get noteViewModels() {
        return this.notes.map((note) => {
            const classNames = ['key'];
            const styles = [
                `height: ${note.height}px`
            ];
            if (note.sharp === true) {
                classNames.push('key--sharp');
                styles.push(`margin: ${-note.height / 2}px 0`)
            }



            return {
                name: note.name,
                className: classNames.join(' '),
                style: styles.join(';')
            };
        })
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
