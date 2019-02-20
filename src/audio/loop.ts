import { CREATE_LOOP, SET_LOOP_RANGE, CREATE_LOOP_NOTE, SET_LOOP_NOTE_KEY, SET_LOOP_NOTE_RANGE, DELETE_LOOP_NOTE } from 'store/loop/const';
import { flatMap, takeUntil, filter } from 'rxjs/operators';
import { CreateLoopAction, SetLoopRangeAction, CreateLoopNoteAction, SetLoopNoteKeyAction, SetLoopNoteRangeAction, DeleteLoopNoteAction } from 'store/loop/action';
import { empty, Observable } from 'rxjs';
import { LoopPlayer } from './LoopPlayer';
import { PlayTrackLoopAction, StopLoopAction } from 'store/player/action';
import { PLAY_TRACK_LOOP, STOP_LOOP } from 'store/player/const';
import { timeZero } from 'util/time';
import { Transport } from 'tone';
import { instrumentNodes } from './instruments';
import { MidiNote } from 'util/sound';

const emptyObservable = empty();
const { keys: objectKeys } = Object;

export const loopPlayers: { [key: string]: LoopPlayer } = {};

export function deleteLoopNoteEpic(actions) {
    return actions.ofType(DELETE_LOOP_NOTE)
        .pipe(
            flatMap((action: DeleteLoopNoteAction) => {
                const { loopId, noteId } = action.payload;
                const player = loopPlayers[loopId];
                player.removeNote(noteId);
                return emptyObservable;
            })
        );
}

export function setLoopNoteRangeEpic(actions) {
    return actions.ofType(SET_LOOP_NOTE_RANGE)
        .pipe(
            flatMap((action: SetLoopNoteRangeAction) => {
                const { loopId, noteId, range } = action.payload;
                const player = loopPlayers[loopId];
                player.setNoteRange(noteId, range);
                return emptyObservable;
            })
        );
}

export function createLoopEpic(actions) {
    return actions.ofType(CREATE_LOOP)
        .pipe(
            flatMap((action: CreateLoopAction) => {
                const { loopId } = action.payload;
                const player = new LoopPlayer(loopId);
                loopPlayers[loopId] = player;
                return emptyObservable;
            })
        )
}



export function setLoopNoteKeyEpic(actions) {
    return actions.ofType(SET_LOOP_NOTE_KEY)
    .pipe(
        flatMap((action: SetLoopNoteKeyAction) => {
            const { loopId, pianoKey, noteId } = action.payload;
            const player = loopPlayers[loopId];
            player.setNotePianoKey(noteId, pianoKey);
            return emptyObservable;
        })
    );
}

export function createLoopNoteEpic(actions) {
    return actions.ofType(CREATE_LOOP_NOTE)
        .pipe(
            flatMap((action: CreateLoopNoteAction) => {
                const { loopId, pianoKey, noteId, range } = action.payload;
                const midiNote: MidiNote = {
                    pianoKey,
                    velocity: 1,
                    id: noteId,
                    range,
                }
                const player = loopPlayers[loopId];
                player.addNotes([midiNote]);
                return emptyObservable;
            })
        );
}

export function setLoopRangeEpic(actions) {
    return actions.ofType(SET_LOOP_RANGE)
        .pipe(
            flatMap((action: SetLoopRangeAction) => {
                const { loopId, range } = action.payload;
                const player = loopPlayers[loopId];
                player.setLoopRange(range);
                return emptyObservable;
            })
        );
}

export function playLoopEpic(actions) {
    return actions.ofType(PLAY_TRACK_LOOP)
        .pipe(
            flatMap((action: PlayTrackLoopAction) => {
                const { loop, tempo } = action.payload;
                const { id: loopId } = loop;
                const player = loopPlayers[loopId];
                const instrumentNode = instrumentNodes[loop.instrumentId];
                const flattenedNotes = loop.notes.toList().toArray();

                player.setTempo(tempo);
                player.addNotes(flattenedNotes);
                player.setLoopRange(loop.range);
                player.setInstrumentNode(instrumentNode);

                let when = timeZero;
                if (objectKeys(loopPlayers).length === 1) {
                    Transport.start();
                }
                player.start(when);

                return Observable.create((o) => {


                    return () => player.stop(timeZero);
                })
                .pipe(
                    takeUntil(
                        actions.ofType(STOP_LOOP).pipe(
                            filter((action: StopLoopAction) => action.payload.loopId === loopId)
                        )
                    )
                )
            })
        )
}
