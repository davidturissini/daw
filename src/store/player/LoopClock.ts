import { Clock } from "./Clock";
import { MidiNote } from "util/sound";
import { AudioRange, contains as audioRangeContains, clamp } from 'util/audiorange';
import { Tempo } from 'store/project';
import { Time, timeZero } from "util/time";

export interface LoopPlayerDelegate {
    on: (key: any, when: Time, offset: Time, duration: Time, cb: () => void) => () => void;
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

    constructor( clock: Clock, range: AudioRange, notes: MidiNote[], delegate: LoopPlayerDelegate) {
        this.clock = clock;
        this.delegate = delegate;
        this.notes = notes;
        this.range = range;
    }

    start(when: Time, offset: Time) {
        this.loopNext(when, offset);
    }

    stop() {
        this.killSignals.forEach((kill) => kill());
    }

    loopNext(when: Time, offset: Time) {
        // We have no notes
        if (this.notes.length === 0) {
            return;
        }

        const { range, clock } = this;
        const { duration: loopDuration } = range;
        const clamped = clampNotes(this.notes, new AudioRange(offset, loopDuration.minus(offset)), clock.tempo);
        const len = clamped.length;
        this.killSignals = [];

        // No notes left to play
        if (len === 0) {
            return this.loopNext(loopDuration.minus(when).minus(offset), timeZero);
        }

        let finished = 0;
        clamped.forEach(({ note, clampOffsetRange }) => {
            const beatStartTime = clock.beatToTime(note.range.start);

            const delegateWhen = clock.audioContextTime().plus(beatStartTime).plus(when).minus(offset);
            const startSnapshot = clock.currentTime;
            const killSignal = this.delegate.on(note.note, delegateWhen, clampOffsetRange.start, clampOffsetRange.duration, () => {
                finished += 1;
                if (finished === len && this.loop) {
                    const endSnapshot = clock.currentTime;
                    const elapsed = endSnapshot.minus(startSnapshot.plus(when).minus(offset));
                    const remaining = loopDuration.minus(elapsed);
                    this.loopNext(remaining, timeZero);
                }
            });

            this.killSignals.push(killSignal);
        });
    }
}
