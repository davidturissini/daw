import { register, ValueChangedEvent } from 'wire-service';
import { getInstance } from './ffmpeg';
import { Time } from './../util/time';

let wiredEventTarget = undefined;
let tracks = {};

export const AudioTrackState = {
    LOADING: 'LOADING',
    READY: 'READY',
}

export function getTrackById(id) {
    return tracks[id];
}

class AudioTrack {

}

function commit(track) {
    tracks = {
        ...tracks,
        [track.id]: track,
    };

    wiredEventTarget.dispatchEvent(
        new ValueChangedEvent({ data: tracks, error: undefined })
    );

    return track;
}

function set(audioTrack, dict) {
    const keys = Object.keys(audioTrack);
    const dictKeys = Object.keys(dict);
    const next = new AudioTrack();

    keys.forEach((key) => {
        if (dict.hasOwnProperty(key)) {
            return;
        }
        next[key] = audioTrack[key];
    });

    dictKeys.forEach((key) => {
        next[key] = dict[key];
    });

    return commit(next);

}

function getAudioTrackMetadata(audioTrack) {
    const ffmpeg = getInstance();
    const process = ffmpeg.createProcess([
        '-i',
        'input.mp3',
    ], [{
        name: 'input.mp3',
        data: audioTrack.data,
    }]);

    const metadata = {};

    process.stdout = ({ data }) => {
        if (/Duration/.test(data)) {
            const timeSplit = data.trim().split('Duration: ')[1].split(',')[0].split(':');
            const hours = parseInt(timeSplit[0], 10);
            const minutes = parseInt(timeSplit[1], 10);
            const secondsFloat = parseFloat(timeSplit[2]);
            const seconds = Math.floor(secondsFloat);
            const milliseconds = (secondsFloat - seconds) * 1000;

            const totalMilliseconds = milliseconds + (seconds * 1000) + (minutes * 60 * 1000) + (hours + 60 * 60 * 1000);
            metadata.duration = new Time(totalMilliseconds);
        }
    }

    return process.execute()
        .then(() => {
            return metadata;
        });
}

export function fetchAudioTrack(id, title, url) {
    const audioTrack = set(new AudioTrack(), {
        id,
        title,
        data: null,
        duration: null,
        state: AudioTrackState.LOADING,
        offset: new Time(60000 * 5),
    });

    fetch(url).then((resp) => resp.arrayBuffer())
        .then((arrayBuffer) => {
            const updatedTrack = set(audioTrack, {
                data: new Uint8Array(arrayBuffer),
            });

            return getAudioTrackMetadata(updatedTrack)
                .then(({ duration }) => {
                    set(updatedTrack, {
                        duration: duration,
                        state: AudioTrackState.READY,
                    });
                });
        });
}

export const audioTracks = Symbol();

register(audioTracks, function (eventTarget) {
    wiredEventTarget = eventTarget;
    wiredEventTarget.dispatchEvent(
        new ValueChangedEvent({
            data: {},
            error: undefined,
        })
    );
});
