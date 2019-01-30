import { LightningElement } from 'lwc';
import { appStore } from 'store/index';
import { createInstrument, CreateInstrumentAction } from 'store/instrument/action';
import { generateId } from './../../util/uniqueid'
import { InstrumentType } from 'store/instrument/types';
import { DrumMachineData } from 'store/instrument/types/DrumMachine';
import { audioContext } from 'util/sound';
import { Beat } from 'util/time';
import { List } from 'immutable';

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


function defaultDrumMachineData(): DrumMachineData {
    const duration = new Beat(4);
    const resolution = new Beat(1 / 4);
    const samples: DrumMachineData['samples'] = List().asMutable();

    for(let i = 0; i < 8; i += 1) {
        const numberOfBeats = duration.index / resolution.index;
        const switches: any[] = []

        for(let i = 0; i < numberOfBeats; i += 1) {
            switches.push({
                onOff: false,
                beat: new Beat(i * resolution.index),
            })
        }

        let sample: AudioBuffer | null = null;
        if (i === 0) {
            sample = drumKickAudioBuffer;
        } else if (i === 1) {
            sample = snareAudioBuffer;
        } else if (i === 2) {
            sample = hiHatAudioBuffer;
        }

        samples.push({
            sample,
            switches: List(switches),
        });
    }

    return new DrumMachineData({
        duration,
        resolution,
        samples: samples.asImmutable()
    });
}

export default class Instruments extends LightningElement {
    handleOscillatorNodeClick(evt: MouseEvent) {
        const instrumentId = generateId();
        const type = (evt.target as HTMLElement).getAttribute('data-instrument-type');
        let action: CreateInstrumentAction;
        switch(type) {
            case InstrumentType.DrumMachine:
                action = createInstrument<DrumMachineData>(
                    instrumentId,
                    type,
                    defaultDrumMachineData(),
                );
                break;
            default:
                throw new Error(`Not Implemented ${type}`);
        }

        appStore.dispatch(action);
    }

    get instruments() {
        return [{
            type: InstrumentType.DrumMachine,
        }, {
            type: InstrumentType.Oscillator,
        }];
    }
}
