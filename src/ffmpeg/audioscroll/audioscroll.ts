import { LightningElement, track } from 'lwc';

export default class AudioScroll extends LightningElement {
    /*
     *
     * Frame
     *
    */
    @track frame = null;
    updateFrame = () => {
        const rect = this.template.host.getBoundingClientRect();
        this.frame = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
        };
    }

    /*
     *
     * Window
     *
    */
    get windowStyle() {
        if (!this.frame) {
            return '';
        }
    }

    /*
     *
     * Lifecycle
     *
    */
    renderedCallback() {
        if (this.frame === null) {
            this.updateFrame();
        }
    }
}
