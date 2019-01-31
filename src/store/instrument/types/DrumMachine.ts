import { InstrumentRenderer, InstrumentType } from './index';
import { AudioRange } from 'util/audiorange';
import { Beat, beatToTime, Time } from 'util/time';
import { Tempo } from 'store/project';
import { Record, List } from 'immutable';
import { silence } from './../../../lib/soundlab';

interface DrumMachineBeatSwitch {
    onOff: boolean;
    beat: Beat;
}

interface DrumMachineSample {
    sample: AudioBuffer | null,
    switches: List<DrumMachineBeatSwitch>
}

export class DrumMachineData extends Record<{
    resolution: Beat,
    duration: Beat,
    samples: List<DrumMachineSample>
}>({
    resolution: new Beat(0),
    duration: new Beat(0),
    samples: List(),
}) {}

export class DrumMachine implements InstrumentRenderer {
    type: InstrumentType.DrumMachine;
    audioContext: AudioContext;
    dest: AudioNode | null = null;
    samples: List<DrumMachineSample>;
    resolution: Beat;
    tempo: Tempo;
    duration: Beat;
    nodes: List<AudioBufferSourceNode> = List();

    constructor(audioContext: AudioContext, tempo: Tempo, data: DrumMachineData) {
        this.audioContext = audioContext;
        this.resolution = data.resolution;
        this.samples = data.samples;
        this.tempo = tempo;
        this.duration = data.duration;
    }
    trigger(frequency: number, range: AudioRange, offset: Time) {
        const { audioContext, tempo } = this;
        const resolutionTime = beatToTime(this.resolution, tempo);
        const promises: Array<Promise<any>> = this.samples.filter(({ sample }) => {
                return sample !== null;
            })
            .reduce((seed: Array<Promise<any>>, { sample, switches }) => {
                const beatPromises = switches.filter(({ beat, onOff }) => {
                    return onOff === true;
                })
                .filter(({ beat }) => {
                    const beatTime = beatToTime(beat, tempo);
                    const value = beatTime.greaterThan(offset) || beatTime.milliseconds === offset.milliseconds;
                    return value;
                })
                .map(({ beat }) => {
                    const node = audioContext.createBufferSource();
                    node.buffer = sample;
                    const beatTime = beatToTime(beat, tempo);
                    const startTime = range.start.plus(beatTime).minus(offset)
                    node.start(startTime.seconds);
                    node.stop(startTime.plus(resolutionTime).seconds);

                    if (this.dest) {
                        node.connect(this.dest);
                    }

                    this.nodes = this.nodes.push(node);

                    return new Promise((res) => {
                        node.onended = () => {
                            this.nodes = this.nodes.remove(this.nodes.indexOf(node));
                            res();
                        }
                    });
                });

                // Empty
                if (beatPromises.size === 0) {
                    seed.push(new Promise((res) => {
                        const buffer = audioContext.createBufferSource();
                        buffer.buffer = silence(audioContext. sampleRate, 1, resolutionTime.seconds);
                        buffer.start();
                        buffer.connect(audioContext.destination);
                        buffer.onended = res;
                    }))
                    return seed;
                }

                return seed.concat(beatPromises.toArray());
            }, []);

        return Promise.all(promises);

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
