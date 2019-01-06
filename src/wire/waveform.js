import { register } from 'wire-service';
import { wireObservable } from './../util/wire-observable';
import { BehaviorSubject } from 'rxjs';
import { Map as ImmutableMap, Record } from 'immutable';
import { AuroraSourceNode as AuroraAssetSourceNode } from './../player/AudioDevice';
import { WaveNode } from 'wave-node';
import { flatMap, filter, combineLatest } from 'rxjs/operators';
import { stream as audioSourceStream } from './audiosource';
import { generateId } from './../util/uniqueid';

const waveformSubject = new BehaviorSubject(new ImmutableMap());

export const WaveformState = {
    LOADING: 'Loading',
    READY: 'Ready',
};

class Waveform extends Record({
    sourceId: null,
    data: null,
    state: null,
    id: null,
}) {

}

function generateWaveform(source) {
    const { sampleRate, duration, channelsCount } = source;
    const { seconds: durationSeconds } = duration;
    const asset = AV.Asset.fromBuffer(source.data);

    const length = sampleRate * durationSeconds;
    const offline = new OfflineAudioContext(
        channelsCount,
        length,
        sampleRate
    );
    const secondsPerPixel = 10/679;
    const scale = Math.floor(sampleRate * secondsPerPixel);
    const sourceNode = new AuroraAssetSourceNode(
        asset,
        offline,
        channelsCount,
        sampleRate,
        durationSeconds,
        {
            bufferSize: 256
        }
    );

    const waveformNode = new WaveNode(
        offline,
        sourceNode.node,
        {
            scale,
        },
        function (waveform) {
            waveformSubject.next(
                waveformSubject.value.mergeIn([source.id], {
                    data: waveform,
                    state: WaveformState.READY,
                })
            )
        }
    )

    waveformNode.node.connect(offline.destination);
    waveformNode.beginRender();
    sourceNode.start();
    offline.startRendering();

}

function loadWaveform(source) {
    const { id: sourceId } = source;
    const waveform = new Waveform({
        id: generateId(),
        sourceId,
        state: WaveformState.LOADING,
    });

    waveformSubject.next(
        waveformSubject.value.set(sourceId, waveform)
    );

    generateWaveform(source);

}

audioSourceStream.pipe(
    flatMap((sources) => sources.toList().toArray()),
    filter((source) => {
        return (
            source.state !== 'LOADING' &&
            !waveformSubject.value.has(source.id)
        );
    }),
).subscribe(loadWaveform)

export const waveformSym = Symbol();

register(waveformSym, wireObservable(waveformSubject.asObservable()));
