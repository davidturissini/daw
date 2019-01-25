import { LightningElement, api, wire, track } from 'lwc';
import { notes, MidiNote } from 'util/sound';
import { wireSymbol } from 'store/index';
import { PianoState } from 'store/piano/reducer';
import { Piano } from 'store/piano';
import { GridElementRow, AudioRangeCreatedEvent, AudioRangeChangeEvent, GridAudioWindowCreatedEvent } from 'cmp/grid/grid';
import { AudioWindowState } from 'store/audiowindow/reducer';
import { Color } from 'util/color';

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

const gridRowNoteMap: { [key: string]: GridElementRow } = Object.keys(notes).reduce((seed, octave) => {
    const note = notes[octave];
    const row: GridElementRow = {
        height: note.sharp ? 30 : 45,
        id: octave,
    };
    seed[octave] = row;
    return seed;
}, {});

export default class PianoElement extends LightningElement {
    @api pianoId: string;
    @api midiNotes: { [key: string]: MidiNote[] };
    @track gridWindowId: string | null = null;
    @wire(wireSymbol, {
        paths: {
            pianos: ['piano', 'items'],
            audiowindow: ['audiowindow', 'items'],
        }
    })
    storeData: {
        data: {
            pianos: PianoState['items'];
            audiowindow: AudioWindowState['items'];
        }
    }

    get gridRows(): GridElementRow[] {
        return Object.values(gridRowNoteMap);
    }

    get piano(): Piano {
        return this.storeData.data.pianos.get(this.pianoId) as Piano;
    }

    get pianoKeyViewModels() {
        return Object.keys(notes).map((key) => {
            const note = notes[key];
            const classNames = ['key'];
            const gridRow = gridRowNoteMap[key];
            const styles = [
                `height: ${gridRow.height}px`
            ];
            if (note.sharp === true) {
                classNames.push('key--sharp');
            }

            return {
                name: key,
                className: classNames.join(' '),
                style: styles.join(';')
            };
        })
    }

    get hasGridWindow() {
        return this.gridWindowId !== null;
    }

    get gridWindow() {
        const { gridWindowId } = this;
        if (gridWindowId) {
            return this.storeData.data.audiowindow.get(gridWindowId);
        }

        return null;
    }

    get noteViewModels() {
        return Object.keys(this.midiNotes).reduce((seed: any[], octave: string) => {
            const notes = this.midiNotes[octave];
            const midiNotes = notes.map((note) => {
                return {
                    octave,
                    color: new Color(0, 255, 0),
                    rowIndex: 12,
                    range: note.range,
                };
            });

            return seed.concat(midiNotes);
        }, []);
    }

    /*
     *
     *  Grid Events
     *
     */
    onGridAudioWindowCreated(evt: GridAudioWindowCreatedEvent) {
        this.gridWindowId = evt.detail.windowId;
    }

    onNoteCreated(evt: AudioRangeCreatedEvent) {
        console.log('created', evt)
    }

    onNoteChanged(evt: AudioRangeChangeEvent) {
        console.log('changed', evt)
    }

    /*
     *
     *  Piano Key Events
     *
     */
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
