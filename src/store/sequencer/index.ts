import { Record } from 'immutable';

export enum SequencerType {
    Arpeggiator = 'Arpeggiator',
}

export class Sequencer extends Record<{
    type: SequencerType.Arpeggiator;
}>({
    type: SequencerType.Arpeggiator,
}) {

}
