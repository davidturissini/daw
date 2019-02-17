import { LightningElement } from 'lwc';
import { appStore } from 'store/index';
import { createInstrument, CreateInstrumentAction } from 'store/instrument/action';
import { generateId } from './../../util/uniqueid'
import { InstrumentType } from 'store/instrument/types';
import { PianoKey } from 'util/sound';
import { SynthData } from 'store/instrument/nodes/Synth';
import { DrumMachineData } from 'store/instrument/nodes/DrumMachine';
import { Color } from 'util/color';
import { NoiseSynthData } from 'store/instrument/nodes/NoiseSynth';
import { AMSynthData } from 'store/instrument/nodes/AMSynth';
import { DuoSynthData } from 'store/instrument/nodes/DuoSynth';
import { FMSynthData } from 'store/instrument/nodes/FMSynth';
import { MonoSynthData } from 'store/instrument/nodes/MonoSynth';
import { PluckSynthData } from 'store/instrument/nodes/PluckSynth';
import { MetalSynthData } from 'store/instrument/nodes/MetalSynth';
import { MembraneSynthData } from 'store/instrument/nodes/MembraneSynth';


export default class Instruments extends LightningElement {
    onAddButtonClick(evt: MouseEvent) {
        const instrumentId = generateId();
        const type = (evt.target as HTMLElement).getAttribute('data-instrument-type');
        const loopId = generateId();
        const audioTrackId = generateId();
        let action: CreateInstrumentAction<any>;
        switch(type) {
            case InstrumentType.DrumMachine:
                const data = new DrumMachineData({
                    sampleNames: {
                        [PianoKey.C3]: 'Kick Drum',
                        [PianoKey.Csharp3]: 'Snare Drum',
                        [PianoKey.D3]: 'Hi Hat',
                        [PianoKey.Dsharp3]: null,
                        [PianoKey.E3]: null,
                        [PianoKey.F3]: null,
                        [PianoKey.Fsharp3]: null,
                        [PianoKey.G3]: null,
                    }
                });
                action = createInstrument<DrumMachineData>(
                    instrumentId,
                    'Drum Machine',
                    type,
                    data,
                    audioTrackId,
                    loopId,
                );
                break;
            case InstrumentType.Synth:
                action = createInstrument<SynthData>(
                    instrumentId,
                    'Synth',
                    type,
                    new SynthData({}),
                    audioTrackId,
                    loopId,
                );
                break;
            case InstrumentType.NoiseSynth:
                action = createInstrument<NoiseSynthData>(
                    instrumentId,
                    'Noise Synth',
                    type,
                    new NoiseSynthData({}),
                    audioTrackId,
                    loopId,
                );
                break;
            case InstrumentType.AMSynth:
                action = createInstrument<AMSynthData>(
                    instrumentId,
                    'AM Synth',
                    type,
                    new AMSynthData({}),
                    audioTrackId,
                    loopId,
                );
                break;
            case InstrumentType.DuoSynth:
                action = createInstrument<DuoSynthData>(
                    instrumentId,
                    'Duo Synth',
                    type,
                    new DuoSynthData({}),
                    audioTrackId,
                    loopId,
                );
                break;
            case InstrumentType.FMSynth:
                action = createInstrument<FMSynthData>(
                    instrumentId,
                    'FM Synth',
                    type,
                    new FMSynthData({}),
                    audioTrackId,
                    loopId,
                );
                break;
            case InstrumentType.MonoSynth:
                action = createInstrument<MonoSynthData>(
                    instrumentId,
                    'Mono Synth',
                    type,
                    new MonoSynthData({}),
                    audioTrackId,
                    loopId,
                );
                break;
            case InstrumentType.PluckSynth:
                action = createInstrument<PluckSynthData>(
                    instrumentId,
                    'Pluck Synth',
                    type,
                    new PluckSynthData({}),
                    audioTrackId,
                    loopId,
                );
                break;
            case InstrumentType.MetalSynth:
                action = createInstrument<MetalSynthData>(
                    instrumentId,
                    'Metal Synth',
                    type,
                    new MetalSynthData({}),
                    audioTrackId,
                    loopId,
                );
                break;
            case InstrumentType.MembraneSynth:
                action = createInstrument<MembraneSynthData>(
                    instrumentId,
                    'Membrane Synth',
                    type,
                    new MembraneSynthData({}),
                    audioTrackId,
                    loopId,
                );
                break;
            default:
                throw new Error(`Not Implemented ${type}`);
        }

        appStore.dispatch(action);
    }

    get instruments(): Array<{ type: InstrumentType }> {
        return Object.keys(InstrumentType).map((key) => {
            const type = InstrumentType[key];
            return {
                type,
            };
        });
    }

    get addButtonColor() {
        return new Color(84, 84, 84);
    }

    get addButtonTextColor() {
        return new Color(176, 176, 176);
    }
}
