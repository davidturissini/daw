import { register, ValueChangedEvent } from 'wire-service';

class Process {
    constructor(worker, pid, args, files) {
        this.pid = pid;
        this.worker = worker;
        this.args = args;
        this.files = files;
    }

    execute() {
        return new Promise((res) => {
            const { worker } = this;
            const onMessage = (evt) => {
                const { data } = evt;
                if (data.pid === this.pid) {
                    if (data.type == 'stdout' && this.stdout) {
                        this.stdout(data);
                    } else if (data.type === 'done') {
                        worker.removeEventListener('message', onMessage);
                        res(data);
                    }
                }
            };
            worker.addEventListener('message', onMessage);

            worker.postMessage({
                type: 'command',
                pid: this.pid,
                arguments: this.args,
                files: this.files,
            });
        });
    }
}


class FFMPEG {
    constructor(worker) {
        this.worker = worker;
        this.pid = 0;
    }
    createProcess(args, files) {
        if (!this.worker) {
            throw new Error(`cannot create process. FFMPEG worker hasn't been created yet`);
        }
        return new Process(this.worker, this.pid += 1, args, files);
    }

}

let instance = null;

export function getFFMPEG() {
    return new Promise((res) => {
        const worker = new Worker('/ffmpeg-worker.js');

        const onReady = (event) => {
            const { data: message } = event;
            if (message.type == "ready") {
                worker.removeEventListener('message', onReady)

                const ffmpeg = new FFMPEG(worker);
                res(ffmpeg);
            }
        }
        worker.addEventListener('message', onReady)
    })
}

export function getInstance() {
    return instance;
}

register(getFFMPEG, function (wiredEventTarget) {
    wiredEventTarget.dispatchEvent(new ValueChangedEvent({
        data: undefined,
        error: undefined
    }));

    getFFMPEG().then((ffmpeg) => {
        instance = ffmpeg;
        wiredEventTarget.dispatchEvent(new ValueChangedEvent({
            data: ffmpeg,
            error: undefined
        }));
    });

});
