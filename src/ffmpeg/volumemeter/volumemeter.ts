import { LightningElement, track } from 'lwc';
import { getMasterOutChain } from '../../wire/masterout';
import { audioContext } from '../../wire/audiosource';
import rafThrottle from 'raf-throttle';

export default class VolumeMeter extends LightningElement {
    @track channels = [];
    averaging = 0.95;
    clipLevel = 0.98;
    clipLag = 250;
    constructor() {
        super();
        const chain = getMasterOutChain(audioContext);
        this.processor = audioContext.createScriptProcessor(2048, 2, 2);
        this.processor.connect(audioContext.destination);
        chain.master.connect(this.processor);
    }

    connectedCallback() {
        this.channels = [{
            volume: 0,
            lastClip: null,
        }, {
            volume: 0,
            lastClip: null,
        }];
        this.processor.onaudioprocess = this.draw;
    }

    draw = rafThrottle((evt) => {
        const { inputBuffer } = evt;
        this.channels.forEach((channel, index) => {
            const { volume } = channel;
            const buf = inputBuffer.getChannelData(index);
            const { length: bufLength } = buf;
            let sum = 0;

            // Do a root-mean-square on the samples: sum up the squares...
            for (let i = 0; i < bufLength; i += 1) {
                const x = buf[i];
                if (Math.abs(x) >= this.clipLevel) {
                    channel.lastClip = window.performance.now();
                }
                sum += x * x;
            }

            // ... then take the square root of the sum.
            const rms =  Math.sqrt(sum / bufLength);

            // Now smooth this out with the averaging factor applied
            // to the previous sample - take the max here because we
            // want "fast attack, slow release."
            channel.volume = Math.max(rms, volume * this.averaging);
        });
    })

    checkClipping(channel) {
		if ((channel.lastClip + this.clipLag) < window.performance.now()) {
            return false;
        }
		return true;
    }

    get channelViews() {
        return this.channels.map((channel, index) => {
            const isClipping = this.checkClipping(channel);
            const background = isClipping ? 'red' : 'rgb(104, 185, 118)';
            const style = `background: ${background}; transform: scale(1, ${channel.volume})`
            return {
                key: index,
                style,
            }
        })
    }
}
