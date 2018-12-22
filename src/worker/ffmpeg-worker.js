import { ffmpeg_run } from './ffmpeg-wasm-bootstrap';

var now = Date.now;

function makePrint(pid) {
  return function print(text) {
    postMessage({
      pid,
      'type' : 'stdout',
      'data' : text
    });
  }
}

let wasmBinary = null;


onmessage = function(event) {

  var message = event.data;

  if (message.type === "command") {
    const pid = message.pid;
    const print = makePrint(pid);
    const Module = {
      print: print,
      printErr: print,
      files: message.files || [],
      arguments: message.arguments || [],
      TOTAL_MEMORY: 268435456
      // Can play around with this option - must be a power of 2
      // TOTAL_MEMORY: 268435456
    };
    postMessage({
      'type' : 'start',
      'data' : Module.arguments.join(" ")
    });

    postMessage({
      pid,
      'type' : 'stdout',
      'data' : 'Received command: ' +
                Module.arguments.join(" ") +
                ((Module.TOTAL_MEMORY) ? ".  Processing with " + Module.TOTAL_MEMORY + " bits." : "")
    });

    var time = now();

    Module['returnCallback'] = function(result) {
      var totalTime = now() - time;

      postMessage({
        pid,
        'type' : 'stdout',
        'data' : 'Finished processing (took ' + totalTime + 'ms)'
      });

      postMessage({
        pid,
        'type' : 'done',
        'data' : result,
        'time' : totalTime
      });
    }

    ffmpeg_run(Module, wasmBinary);
  }
};

WebAssembly.compileStreaming(fetch('https://cdn.glitch.com/1c5226ac-9c37-4921-82e8-3b70672e4d46%2Fffmpeg.wasm?1545092451416'))
  .then((bin) => {
    wasmBinary = bin;
    postMessage({
      'type' : 'ready'
    });
})
