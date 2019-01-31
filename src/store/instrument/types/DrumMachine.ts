import { InstrumentRenderer, InstrumentType } from './index';
import { AudioRange } from 'util/audiorange';
import { Beat, beatToTime, Time } from 'util/time';
import { Tempo } from 'store/project';
import { Record, List } from 'immutable';
import { silence } from './../../../lib/soundlab';
import { audioContext } from 'util/sound';

let drumKickAudioBuffer: AudioBuffer;
let snareAudioBuffer: AudioBuffer;
let hiHatAudioBuffer: AudioBuffer;

fetch('./samples/DDE Kick 1.wav')
    .then((resp) => resp.arrayBuffer())
    .then((arrayBuffer) => {
        audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
            drumKickAudioBuffer = audioBuffer;
        });
    })

fetch('./samples/DDE Snare 4.wav')
    .then((resp) => resp.arrayBuffer())
    .then((arrayBuffer) => {
        audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
            snareAudioBuffer = audioBuffer;
        });
    })

fetch('./samples/DDE HiHat 1.wav')
    .then((resp) => resp.arrayBuffer())
    .then((arrayBuffer) => {
        audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
            hiHatAudioBuffer = audioBuffer;
        });
    })

export enum DrumMachineNotes {
    Zero = 'Zero',
    One = 'One',
    Two = 'Two',
    Three = 'Three',
    Four = 'Four',
    Five = 'Five',
    Six = 'Six',
    Seven = 'Seven',
    Eight = 'Eight',
}

export class DrumMachineLoopData extends Record<{
    resolution: Beat,
}>({
    resolution: new Beat(1 / 4),
}) {}

export class DrumMachine implements InstrumentRenderer<DrumMachineNotes> {
    type: InstrumentType.DrumMachine;
    audioContext: AudioContext;
    dest: AudioNode | null = null;
    resolution: Beat;
    tempo: Tempo;
    duration: Beat;
    nodes: List<AudioBufferSourceNode> = List();

    constructor(audioContext: AudioContext, tempo: Tempo) {
        this.audioContext = audioContext;
        this.tempo = tempo;
    }
    trigger(key: DrumMachineNotes, range: AudioRange, offset: Time) {
        // const { audioContext, tempo } = this;
        // const resolutionTime = beatToTime(this.resolution, tempo);
        // const promises: Array<Promise<any>> = this.samples.filter(({ sample }) => {
        //         return sample !== null;
        //     })
        //     .reduce((seed: Array<Promise<any>>, { sample, switches }) => {
        //         const beatPromises = switches.filter(({ beat, onOff }) => {
        //             return onOff === true;
        //         })
        //         .filter(({ beat }) => {
        //             const beatTime = beatToTime(beat, tempo);
        //             const value = beatTime.greaterThan(offset) || beatTime.milliseconds === offset.milliseconds;
        //             return value;
        //         })
        //         .map(({ beat }) => {
        //             const node = audioContext.createBufferSource();
        //             node.buffer = sample;
        //             const beatTime = beatToTime(beat, tempo);
        //             const startTime = range.start.plus(beatTime).minus(offset)
        //             node.start(startTime.seconds);
        //             node.stop(startTime.plus(resolutionTime).seconds);

        //             if (this.dest) {
        //                 node.connect(this.dest);
        //             }

        //             this.nodes = this.nodes.push(node);

        //             return new Promise((res) => {
        //                 node.onended = () => {
        //                     this.nodes = this.nodes.remove(this.nodes.indexOf(node));
        //                     res();
        //                 }
        //             });
        //         });

        //         // Empty
        //         if (beatPromises.size === 0) {
        //             seed.push(new Promise((res) => {
        //                 const buffer = audioContext.createBufferSource();
        //                 buffer.buffer = silence(audioContext. sampleRate, 1, resolutionTime.seconds);
        //                 buffer.start();
        //                 buffer.connect(audioContext.destination);
        //                 buffer.onended = res;
        //             }))
        //             return seed;
        //         }

        //         return seed.concat(beatPromises.toArray());
        //     }, []);

        // return Promise.all(promises);

        return new Promise((res) => {
            console.log('trying to play drum')
            res();
        });
    }

    connect(node: AudioNode) {
        this.dest = node;
    }

    kill() {
        this.nodes.forEach((node) => {
            node.disconnect();
            node.stop();
        });
    }
}
