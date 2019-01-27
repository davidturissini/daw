import { LightningElement } from 'lwc';
import { timeZero } from 'util/time';

export default class Controls extends LightningElement {
    get isPlaying() {
        return false;
    }

    get displayTime() {
        return timeZero;
    }

    get playButtonClass() {
        const base = `control`;

        if (this.isPlaying) {
            return `${base} control--playing`;
        }

        return base;
    }

    get stopButtonClass() {
        return 'control';
    }

    onSilenceDetectClick() {
        const event = new CustomEvent('silencedetectbuttonclick', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    onStopClick() {
        const event = new CustomEvent('stopbuttonclick', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    onPlayClick() {
        const event = new CustomEvent('playbuttonclick', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
}
