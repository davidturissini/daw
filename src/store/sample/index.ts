let drumKickAudioBuffer: AudioBuffer;
let snareAudioBuffer: AudioBuffer;
let hiHatAudioBuffer: AudioBuffer;

export function getSamples() {
    return {
        drumKickAudioBuffer,
        snareAudioBuffer,
        hiHatAudioBuffer,
    }
}

export function loadSamples(audioContext: BaseAudioContext) {
    fetch('/samples/DDE Kick 1.wav')
        .then((resp) => resp.arrayBuffer())
        .then((arrayBuffer) => {
            audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
                drumKickAudioBuffer = audioBuffer;
            });
        })

    fetch('/samples/DDE Snare 4.wav')
        .then((resp) => resp.arrayBuffer())
        .then((arrayBuffer) => {
            audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
                snareAudioBuffer = audioBuffer;
            });
        })

    fetch('/samples/DDE HiHat 1.wav')
        .then((resp) => resp.arrayBuffer())
        .then((arrayBuffer) => {
            audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
                hiHatAudioBuffer = audioBuffer;
            });
        })
}
