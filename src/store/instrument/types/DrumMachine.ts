import { InstrumentRenderer, InstrumentType } from './index';
import { AudioRange } from 'util/audiorange';
import { Beat, beatToTime } from 'util/time';
import { Tempo } from 'store/project';
import { Record, List } from 'immutable';

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

    constructor(audioContext: AudioContext, tempo: Tempo, data: DrumMachineData) {
        this.audioContext = audioContext;
        this.resolution = data.resolution;
        this.samples = data.samples;
        this.tempo = tempo;
        this.duration = data.duration;
    }
    trigger(frequency: number, range: AudioRange) {
        const { audioContext, tempo } = this;
        const resolutionTime = beatToTime(this.resolution, tempo);
        const promises: Array<Promise<any>> = this.samples.filter(({ sample }) => {
                return sample !== null;
            })
            .reduce((seed: Array<Promise<any>>, { sample, switches }) => {
                const beatPromises = switches.filter(({ beat, onOff }) => {
                    return onOff === true;
                })
                .map(({ beat }) => {
                    const node = audioContext.createBufferSource();
                    node.buffer = sample;
                    const beatTime = beatToTime(beat, tempo);
                    const startTime = range.start.plus(beatTime);
                    node.start(startTime.seconds);
                    node.stop(startTime.plus(resolutionTime).seconds);

                    if (this.dest) {
                        node.connect(this.dest);
                    }

                    return new Promise((res) => {
                        node.onended = () => res();
                    });
                });

                return seed.concat(beatPromises.toArray());
            }, []);

        return Promise.all(promises);

    }

    connect(node: AudioNode) {
        this.dest = node;
    }
}
