import { Clock } from "./Clock";
import { MidiNote } from "util/sound";
import { AudioRange, contains as audioRangeContains, clamp } from 'util/audiorange';
import { Tempo } from 'store/project';
import { Time, timeZero, beatToTime } from "util/time";
import { Loop as ToneLoop, Transport } from 'tone';

export interface LoopPlayerDelegate {
    on: (key: any, when: Time, offset: Time, duration: Time) => void;
}

interface ClampedMidiNote {
    note: MidiNote,
    clampOffsetRange: AudioRange;
}

function clampNotes(midiNotes: MidiNote[], range: AudioRange, tempo: Tempo): ClampedMidiNote[] {
    return midiNotes.filter((note) => {
        return audioRangeContains(note.range.toAudioRange(tempo), range);
    })
    .map((midiNote: MidiNote) => {
        const noteAudioRange = midiNote.range.toAudioRange(tempo);
        const clamped = clamp(range, noteAudioRange);
        const offsetTime = clamped.start.minus(noteAudioRange.start);

        return {
            note: midiNote,
            clampOffsetRange: new AudioRange(offsetTime, clamped.duration)
        };
    })
}

export class LoopClock {
    clock: Clock;
    delegate: LoopPlayerDelegate;
    notes: MidiNote[];
    range: AudioRange;
    killSignals: Array<() => void> = [];
    loop: boolean = false;
    toneLoop: ToneLoop | null = null;

    constructor( clock: Clock, range: AudioRange, notes: MidiNote[], delegate: LoopPlayerDelegate) {
        this.clock = clock;
        this.delegate = delegate;
        this.notes = notes;
        this.range = range;
    }

    start(when: Time, offset: Time) {
        if (Transport.state !== 'started') {
            Transport.start();
        }
        const { duration: loopDuration } = this.range;
        const loopDurationSeconds = loopDuration.seconds;
        console.log(when.seconds)
        this.toneLoop = new ToneLoop((time: number) => {
            this.loopNext(Time.fromSeconds(time), timeZero);
        }, loopDurationSeconds).start(when.seconds)
    }

    loopNext(when: Time, offset: Time) {
        const { range, clock } = this;
        const { duration: loopDuration } = range;
        const clamped = clampNotes(this.notes, new AudioRange(offset, loopDuration.minus(offset)), clock.tempo);
        clamped.forEach(({ note }) => {
            const beatStartTime = clock.beatToTime(note.range.start);
            this.delegate.on(note.note, when.plus(beatStartTime), timeZero, beatToTime(note.range.duration, clock.tempo));
        });
    }

    stop(time: Time) {
        if (this.toneLoop) {
            this.toneLoop.stop(time.seconds);
        }
    }
}
