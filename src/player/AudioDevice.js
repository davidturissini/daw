//JavaScript Audio Resampler
//Copyright (C) 2011-2015 Grant Galitz
//Released to Public Domain
function Resampler(fromSampleRate, toSampleRate, channels, inputBufferLength) {
    this.fromSampleRate = +fromSampleRate;
    this.toSampleRate = +toSampleRate;
    this.channels = channels | 0;
    this.inputBufferLength = inputBufferLength;
    this.initialize();
  }

  Resampler.prototype.initialize = function () {
    //Perform some checks:
    if (this.fromSampleRate > 0 && this.toSampleRate > 0 && this.channels > 0) {
      if (this.fromSampleRate == this.toSampleRate) {
        //Setup a resampler bypass:
        this.resampler = this.bypassResampler;    //Resampler just returns what was passed through.
        this.ratioWeight = 1;
      } else {
        this.ratioWeight = this.fromSampleRate / this.toSampleRate;
        if (this.fromSampleRate < this.toSampleRate) {
          /*
            Use generic linear interpolation if upsampling,
            as linear interpolation produces a gradient that we want
            and works fine with two input sample points per output in this case.
          */
          this.compileLinearInterpolationFunction();
          this.lastWeight = 1;
        } else {
          /*
            Custom resampler I wrote that doesn't skip samples
            like standard linear interpolation in high downsampling.
            This is more accurate than linear interpolation on downsampling.
          */
          this.compileMultiTapFunction();
          this.tailExists = false;
          this.lastWeight = 0;
        }

        var outputBufferSize = (Math.ceil(this.inputBufferLength * this.toSampleRate / this.fromSampleRate / this.channels * 1.01) * this.channels) + this.channels;
        this.outputBuffer = new Float32Array(outputBufferSize);
        this.lastOutput = new Float32Array(this.channels);
      }
    } else {
      throw(new Error("Invalid settings specified for the resampler."));
    }
  };

  Resampler.prototype.compileLinearInterpolationFunction = function () {
    var toCompile = "var outputOffset = 0;\
      var bufferLength = buffer.length;\
      if (bufferLength > 0) {\
        var weight = this.lastWeight;\
        var firstWeight = 0;\
        var secondWeight = 0;\
        var sourceOffset = 0;\
        var outputOffset = 0;\
        var outputBuffer = this.outputBuffer;\
        for (; weight < 1; weight += " + this.ratioWeight + ") {\
          secondWeight = weight % 1;\
          firstWeight = 1 - secondWeight;";
          for (var channel = 0; channel < this.channels; ++channel) {
            toCompile += "outputBuffer[outputOffset++] = (this.lastOutput[" + channel + "] * firstWeight) + (buffer[" + channel + "] * secondWeight);";
          }
        toCompile += "}\
        weight -= 1;\
        for (bufferLength -= " + this.channels + ", sourceOffset = Math.floor(weight) * " + this.channels + "; sourceOffset < bufferLength;) {\
          secondWeight = weight % 1;\
          firstWeight = 1 - secondWeight;";
          for (var channel = 0; channel < this.channels; ++channel) {
            toCompile += "outputBuffer[outputOffset++] = (buffer[sourceOffset" + ((channel > 0) ? (" + " + channel) : "") + "] * firstWeight) + (buffer[sourceOffset + " + (this.channels + channel) + "] * secondWeight);";
          }
          toCompile += "weight += " + this.ratioWeight + ";\
          sourceOffset = Math.floor(weight) * " + this.channels + ";\
        }";
        for (var channel = 0; channel < this.channels; ++channel) {
          toCompile += "this.lastOutput[" + channel + "] = buffer[sourceOffset++];";
        }
        toCompile += "this.lastWeight = weight % 1;\
      }\
      return this.outputBuffer;";

    this.resampler = Function("buffer", toCompile);
  };

  Resampler.prototype.compileMultiTapFunction = function () {
    var toCompile = "var outputOffset = 0;\
      var bufferLength = buffer.length;\
      if (bufferLength > 0) {\
        var weight = 0;";
        for (var channel = 0; channel < this.channels; ++channel) {
          toCompile += "var output" + channel + " = 0;"
        }
        toCompile += "var actualPosition = 0;\
        var amountToNext = 0;\
        var alreadyProcessedTail = !this.tailExists;\
        this.tailExists = false;\
        var outputBuffer = this.outputBuffer;\
        var currentPosition = 0;\
        do {\
          if (alreadyProcessedTail) {\
            weight = " + this.ratioWeight + ";";
            for (channel = 0; channel < this.channels; ++channel) {
              toCompile += "output" + channel + " = 0;"
            }
          toCompile += "}\
          else {\
            weight = this.lastWeight;";
            for (channel = 0; channel < this.channels; ++channel) {
              toCompile += "output" + channel + " = this.lastOutput[" + channel + "];"
            }
            toCompile += "alreadyProcessedTail = true;\
          }\
          while (weight > 0 && actualPosition < bufferLength) {\
            amountToNext = 1 + actualPosition - currentPosition;\
            if (weight >= amountToNext) {";
              for (channel = 0; channel < this.channels; ++channel) {
                toCompile += "output" + channel + " += buffer[actualPosition++] * amountToNext;"
              }
              toCompile += "currentPosition = actualPosition;\
              weight -= amountToNext;\
            }\
            else {";
              for (channel = 0; channel < this.channels; ++channel) {
                toCompile += "output" + channel + " += buffer[actualPosition" + ((channel > 0) ? (" + " + channel) : "") + "] * weight;"
              }
              toCompile += "currentPosition += weight;\
              weight = 0;\
              break;\
            }\
          }\
          if (weight <= 0) {";
            for (channel = 0; channel < this.channels; ++channel) {
              toCompile += "outputBuffer[outputOffset++] = output" + channel + " / " + this.ratioWeight + ";"
            }
          toCompile += "}\
          else {\
            this.lastWeight = weight;";
            for (channel = 0; channel < this.channels; ++channel) {
              toCompile += "this.lastOutput[" + channel + "] = output" + channel + ";"
            }
            toCompile += "this.tailExists = true;\
            break;\
          }\
        } while (actualPosition < bufferLength);\
      }\
      return this.outputBuffer;";

    this.resampler = Function("buffer", toCompile);
  };

  Resampler.prototype.bypassResampler = function (inputBuffer) {
    return inputBuffer;
  };


class Queue {
    constructor(asset, onReady) {
        this.asset = asset;
        this.readyMark = 16;
        this.finished = false;
        this.buffering = true;
        this.ended = false;
        this.buffers = [];
        this.onReady = onReady;

        this.asset.on('data', this.write);
        this.asset.on('end', () => this.ended = true);

        this.decodePacket();
    }

    decodePacket() {
        this.asset.decodePacket();
    }

    destroy() {
        this.asset.off('data');
        this.asset.off('end');
    }

    write = (buffer) => {
        if (buffer) {
            this.buffers.push(buffer);
        }

        if (this.buffering) {
            if (this.buffers.length >= this.readyMark || this.ended) {
                this.buffering = false;
                return this.onReady(this);
            } else {
                this.decodePacket();
            }
        }
    }

    read() {
        if (this.buffers.length === 0) {
            return null;
        }
        this.decodePacket();
        return this.buffers.shift();
    }
    reset() {
        this.buffers.length = 0;
        this.buffering = true;
        this.decodePacket();
    }
}

function round(number) {
    return Math.round(number * 100) / 100;
}

export class AuroraSourceNode {
    frame = null;
    frameOffset = null;

    readyState = 0;

    sampleRate = null;
    channels = null;
    bufferSize = null;

    constructor(asset, audioContext, numChannels, sampleRate, duration, playbackOptions = {}) {
        if (!audioContext) {
            throw new Error('Audio Context not specified for Node');
        }
        if (typeof numChannels !== 'number') {
            throw new Error('Invalid number of channels passed to AuroraSourceNode');
        }

        if (typeof sampleRate !== 'number') {
            throw new Error('Invalid sampleRate passed to AuroraSourceNode');
        }
        const deviceSampleRate = audioContext.sampleRate;

        this.asset = asset;
        this.context = audioContext;
        this.sampleRate = sampleRate;

        this.playbackWhen = playbackOptions.when || 0;
        this.sourceOffset = playbackOptions.offset || 0;
        this.playbackDuration = playbackOptions.duration || duration;

        const baseBufferSize = playbackOptions.bufferSize || 512;
        this.bufferSize = Math.ceil(baseBufferSize / (deviceSampleRate / sampleRate) * numChannels);
        this.bufferSize += this.bufferSize % numChannels;
        this.node = this.context.createScriptProcessor(baseBufferSize, numChannels, numChannels);

        if (deviceSampleRate !== sampleRate) {
            this.resampler = new Resampler(sampleRate, deviceSampleRate, numChannels, this.bufferSize);
        }

        if (!asset.decoder) {
            asset.once('decodeStart', this.onAssetDecoder);
        } else {
            this.onAssetDecoder();
        }
        asset.start(false);
    }

    onAssetDecoder = () => {
        const { asset, sourceOffset, sampleRate } = this;
        this.readyState = 1;
        this.queue = new Queue(asset, () => {
            this.readyState = 2;
            this.queue.onReady = () => {}

            if (this.playOnQueueReady === true) {
                this.attachScriptNode();
            }

            if (sourceOffset === 0) {
                return;
            }

            const timestamp = round(sourceOffset) * sampleRate;
            asset.decoder.seek(sourceOffset);
            this.queue.reset();
        });
        this.refillHandler = this.handleRefill(this.queue);
    }

    attachScriptNode() {
        this.playOnQueueReady = undefined;
        this.startTime = this.context.currentTime
        this.node.onaudioprocess = this.onAudioProcess;
    }

    start() {
        if (this.readyState === 3) {
            throw new Error('Cannot play. Node has already been played');
        }

        if (this.readyState < 2) {
            this.playOnQueueReady = true;
        } else {
            this.attachScriptNode();
        }
        return new Promise((res) => {
            this.resolveStart = res;
        });
    }

    stop() {
        this.startTime = null;
        this.disconnect();
        this.readyState = 3;
        if (this.resolveStart) {
            this.resolveStart();
        }
    }


    handleRefill(queue) {
        let frame = null;
        let frameOffset = null;
        return function (buffer) {
            var bufferOffset, j, i, max, ref;
            if (!frame) {
                frame = queue.read();
                frameOffset = 0;
            }
            bufferOffset = 0;
            while (frame && bufferOffset < buffer.length) {
                max = Math.min(frame.length - frameOffset, buffer.length - bufferOffset);
                for (i = j = 0, ref = max; j < ref; i = j += 1) {
                    buffer[bufferOffset++] = frame[frameOffset++];
                }
                if (frameOffset === frame.length) {
                    frame = queue.read();
                    frameOffset = 0;
                }
            }
        }
    }

    onAudioProcess = (event) => {
        const currentTime = this.context.currentTime - this.startTime;
        if (currentTime < this.playbackWhen) {
            return;
        }

        if (currentTime > this.playbackWhen + this.playbackDuration) {
            this.stop();
            return;
        }
        var channelCount, channels, data, i, j, k, l, n, outputBuffer, ref, ref1, ref2;
        outputBuffer = event.outputBuffer;
        channelCount = outputBuffer.numberOfChannels;
        channels = new Array(channelCount);
        for (i = j = 0, ref = channelCount; j < ref; i = j += 1) {
            channels[i] = outputBuffer.getChannelData(i);
        }
        data = new Float32Array(this.bufferSize);
        this.refillHandler(data);
        if (this.resampler) {
            data = this.resampler.resampler(data);
        }
        for (i = k = 0, ref1 = outputBuffer.length; k < ref1; i = k += 1) {
            for (n = l = 0, ref2 = channelCount; l < ref2; n = l += 1) {
                channels[n][i] = data[i * channelCount + n];
            }
        }
    }

    connect(outputNode) {
        this.node.connect(outputNode);
    }

    disconnect() {
        this.node.disconnect();
        this.node.onaudioprocess = null;
    }
};

