export function subbuffer(audioBuffer, startMilliseconds, durationMilliseconds) {
    const {
        sampleRate,
        numberOfChannels,
    } = audioBuffer;
    const durationSeconds = durationMilliseconds / 1000;
    const startSeconds = startMilliseconds / 1000;

    const sub = new AudioBuffer({
        length: Math.ceil(durationSeconds * sampleRate),
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

export function join(audioBuffers) {
    const [first, ...rest] = audioBuffers;
    return rest.reduce((seed, audioBuffer) => {
        const {
            numberOfChannels,
        } = seed;

        const buffer = new AudioBuffer({
            length: seed.length + audioBuffer.length,
            sampleRate: seed.sampleRate,
            numberOfChannels,
        });

        for(let i = 0; i < numberOfChannels; i += 1) {
            const channelData = buffer.getChannelData(i);
            channelData.set(seed.getChannelData(i), 0);
            channelData.set(audioBuffer.getChannelData(i), seed.length);
        }

        return buffer;
    }, first);
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

export function silence(sampleRate, numberOfChannels, milliseconds) {
    const seconds = milliseconds / 1000;
    return new AudioBuffer({
        length: Math.ceil(sampleRate * seconds),
        sampleRate,
        numberOfChannels,
    });
}

export function mix(audioBuffers) {
    const data = audioBuffers.reduce((seed, audioBuffer) => {
        if (seed.length < audioBuffer.length) {
            seed.length = audioBuffer.length;
        }

        if (seed.numberOfChannels < audioBuffer.numberOfChannels) {
            seed.numberOfChannels = audioBuffer.numberOfChannels;
        }

        if (seed.sampleRate === null) {
            seed.sampleRate = audioBuffer.sampleRate;
        }

        return seed;
    }, {
        length: 0,
        numberOfChannels: 0,
        sampleRate: null,
        sources: [],
    });
    const context = new OfflineAudioContext(
        data.numberOfChannels,
        data.length,
        data.sampleRate
    );

    audioBuffers.forEach((audioBuffer) => {
        const source = context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(context.destination);
        source.start();
    });

    return context.startRendering();
}
