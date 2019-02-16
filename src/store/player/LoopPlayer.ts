import { Time, timeZero } from "util/time";
import { PianoKey, MidiNote } from "util/sound";
import { InstrumentAudioNode } from "store/instrument/types";
import { Tempo } from "store/project";
import { TickRange, tickTime } from "store/tick";
import { Part as TonePart } from 'tone';

interface TonePartObject {
    time: Time;
    data: [
        PianoKey,
        number,
        Time
    ]
}

export class LoopPlayer {
    notes: { [key: string]: MidiNote } = {};
    instrumentNode: InstrumentAudioNode<any>;
    tempo: Tempo;
    loopRange: TickRange;
    schedule: {[key: string]: TonePartObject } = {};
    part?: TonePart;
    onTimeUpdate?: (time: number) => void;
    constructor(instrumentNode: InstrumentAudioNode<any>, loopRange: TickRange, tempo: Tempo) {
        this.instrumentNode = instrumentNode;
        this.tempo = tempo;
        this.loopRange = loopRange;
    }

    start(when: Time) {
        const { loopRange, tempo } = this;
        const loopStartTime = tickTime(loopRange.start, tempo);
        const loopDurationTime = tickTime(loopRange.duration, tempo);

        const { instrumentNode, notes } = this;
        const schedule = this.schedule = {};

        const values = Object.values(notes);
        const partObjectsArray: any[] = [];
        for(let i = 0; i < values.length; i += 1) {
            const note = values[i];
            const partObject = this.noteToPartObject(note, note.range);
            schedule[note.id] = partObject;
            partObjectsArray.push([
                partObject.time.seconds,
                partObject.data
            ])
        }
        const part = this.part = new TonePart((time: number, [note, velocity, duration]: any) => {
            instrumentNode.trigger(
                note,
                velocity,
                Time.fromSeconds(time),
                timeZero,
                duration,
            );
        }, partObjectsArray as any);
        part.loop = true;
        part.loopStart = loopStartTime.seconds;
        part.loopEnd = loopDurationTime.seconds;
        part.start(when.seconds)
    }

    stop(when: Time) {
        const { part } = this;
        if (part) {
            part.stop(when.seconds);
            part.cancel(when.seconds);
        }
    }

    setLoopRange(loopRange: TickRange) {
        const { part, tempo } = this;
        if (part) {
            part.loopEnd = tickTime(loopRange.duration, tempo).seconds;
            part.loopStart = tickTime(loopRange.start, tempo).seconds;
        }
    }

    noteToPartObject(note: MidiNote, range: TickRange): TonePartObject {
        const { tempo } = this;
        const timeDuration = tickTime(range.duration, tempo);
        const startTime = tickTime(range.start, tempo);
        return {
            time: startTime,
            data: [
                note.note as PianoKey,
                note.velocity,
                timeDuration,
            ]
        }
    }

    get currentTime(): Time {
        const { part } = this;
        if (part) {
            const { loopStart, progress, loopEnd } = part;
            const seconds = (loopStart as number) + (progress * ((loopEnd as number) - (loopStart as number)));
            return Time.fromSeconds(seconds);
        }
        return timeZero;
    }

    addNotes(notes: MidiNote[]) {
        const { part, schedule } = this;
        notes.reduce((seed, note: MidiNote) => {
            seed[note.id] = note;

            if (part) {
                const partObject = this.noteToPartObject(note, note.range);
                schedule[note.id] = partObject;
                (part as any).add(partObject.time.seconds, partObject.data);
            }

            return seed;
        }, this.notes);
    }

    setNoteRange(noteId: string, range: TickRange) {
        const note = this.notes[noteId];
        this.removeNote(noteId);
        note.range = range;
        this.addNotes([note]);
    }

    removeNote(noteId: string) {
        const { schedule, part } = this;
        if (schedule[noteId] && part) {
            (part as any).remove(schedule[noteId].time.seconds, schedule[noteId].data);
        }
        delete this.notes[noteId];
    }
}
