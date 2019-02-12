import { LightningElement, api } from 'lwc';
import { MidiNote, PianoKey } from 'util/sound';
import { TickRange } from 'store/tick';
import { AudioWindowGridRow, AudioWindowGridTickRange } from 'cmp/audiowindowgrid/audiowindowgrid';

export type PianoMidiNoteMap = {
    [octave: string]: MidiNote[]
};

export default class PianoElement extends LightningElement {
    @api range: TickRange;

    get gridRows(): AudioWindowGridRow<PianoKey, any>[] {
        return Object.keys(PianoKey).map((pianoKey: PianoKey) => {
            const vm: AudioWindowGridRow<PianoKey, any> = {
                id: pianoKey,
                data: {
                    label: pianoKey,
                },
                frame: {
                    width: 150,
                    height: 20
                }
            };

            return vm;
        });
    }

    get loopRanges(): AudioWindowGridTickRange<any>[] {
        return [];
    }
}
