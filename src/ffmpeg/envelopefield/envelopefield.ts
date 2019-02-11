import { LightningElement, api } from 'lwc';

type EnvelopeType = 'attack' | 'sustain' | 'decay' | 'release';

export type EnvelopeValueChangeEvent = CustomEvent<{
   type: EnvelopeType;
   value: number;
}>

function createEnvelopeValueChangeEvent(type: EnvelopeType, value: number): EnvelopeValueChangeEvent {
    const event: EnvelopeValueChangeEvent = new CustomEvent('envelopevaluechange', {
        bubbles: true,
        composed: false,
        detail: {
            type,
            value,
        },
    });

    return event;
}

export default class EnvelopeFieldElement extends LightningElement {
    @api attack: number;
    @api sustain: number;
    @api decay: number;
    @api release: number;
    @api fields: EnvelopeType[] = ['attack', 'sustain', 'decay', 'release'];

    onAttackInput(evt) {
        const event = createEnvelopeValueChangeEvent('attack', parseFloat(evt.target.value));
        this.dispatchEvent(event);
    }

    onSustainInput(evt) {
        const event = createEnvelopeValueChangeEvent('sustain', parseFloat(evt.target.value));
        this.dispatchEvent(event);
    }

    onDecayInput(evt) {
        const event = createEnvelopeValueChangeEvent('decay', parseFloat(evt.target.value));
        this.dispatchEvent(event);
    }

    onReleaseInput(evt) {
        const event = createEnvelopeValueChangeEvent('release', parseFloat(evt.target.value));
        this.dispatchEvent(event);
    }

    get showAttack() {
        return this.fields.indexOf('attack') > -1;
    }

    get showSustain() {
        return this.fields.indexOf('sustain') > -1;
    }

    get showDecay() {
        return this.fields.indexOf('decay') > -1;
    }

    get showRelease() {
        return this.fields.indexOf('release') > -1;
    }


    get userValues() {
        return {
            attack: this.attack * 100,
            sustain: this.sustain * 100,
            decay: this.decay * 100,
            release: this.release * 100,
        };
    }
}
