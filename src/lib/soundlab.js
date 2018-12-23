export function subbuffer(audioBuffer, startMilliseconds, durationMilliseconds) {
    const {
        sampleRate,
        numberOfChannels,
    } = audioBuffer;
    const durationSeconds = durationMilliseconds / 1000;
    const startSeconds = startMilliseconds / 1000;

    const sub = new AudioBuffer({
        length: durationSeconds * sampleRate,
        numberOfChannels,
        sampleRate,
    });

    const startByte = startSeconds * sampleRate;
    const durationBytes = durationSeconds * sampleRate;
    const endBytes = startByte + durationBytes;

    for(let i = 0; i < numberOfChannels; i += 1) {
        const channelData = sub.getChannelData(i);
        const subset = audioBuffer.getChannelData(i).slice(startByte, endBytes);
        channelData.set(subset, 0);
    }

    return sub;
}

export function split(audioBuffer, milliseconds) {
    const {
        duration,
    } = audioBuffer;
    const durationMilliseconds = duration * 1000;

    const ranges = [{
        start: 0,
        duration: milliseconds - 1,
    }, {
        start: milliseconds,
        duration: durationMilliseconds - milliseconds,
    }];

    return ranges.map(({ start, duration }) => {
        return subbuffer(
            audioBuffer,
            start,
            duration
        );
    });
}

export function gain(audioBuffer, gainValue) {
    const {
        numberOfChannels,
        length,
        sampleRate,
    } = audioBuffer;
    const context = new OfflineAudioContext(numberOfChannels, length, sampleRate);
    const source = context.createBufferSource();
    source.buffer = audioBuffer;

    const gainNode = context.createGain();
    gainNode.gain.value = gainValue;

    source.connect(gainNode);
    gainNode.connect(context.destination);
    source.start();

    return context.startRendering();
}
