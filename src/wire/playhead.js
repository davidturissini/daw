import { getInstance } from './ffmpeg';

export function play(editor, audioTracks) {
    const ffmpeg = getInstance();
    const process = ffmpeg.createProcess([
        '-i',
        'input1.flac',
        '-i',
        'input2.flac',
        '-filter_complex',
        'amix=inputs=2:duration=first:dropout_transition=2',
        '-o',
        '-',
    ], [{
        name: 'input1.flac',
        data: audioTracks.data.mousetalgia.data
    }, {
        name: 'input2.flac',
        data: audioTracks.data.mousetalgia.data,
    }]);

    process.stdout = (data) => {
        console.log('data', data);
    }

    process.execute().then((result) => {
        console.log('result', result);
    });
}
