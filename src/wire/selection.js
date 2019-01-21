import { register } from 'wire-service';
import { BehaviorSubject } from 'rxjs';
import { Record, List } from 'immutable';
import { wireObservable } from './../util/wire-observable';
import { splitSegment, deleteTrackSegment } from './audiotrack';

class Selection extends Record({
    frame: null,
    selections: new List()
}) {

}

class TimeRangeSelection extends Record({
    range: null,
    segmentId: null,
    trackId: null,
}) {}

const selectionSubject = new BehaviorSubject(new Selection());
const stream = selectionSubject.asObservable();

function dispatch(func) {
    return function (...args) {
        const nextState = func(selectionSubject.value, ...args);
        selectionSubject.next(nextState);
    }
}

export const setSelectionFrame = dispatch(function (currentState, frame) {
    return currentState.set('frame', frame);
});

export const clearSelectionFrame = dispatch(function (currentState) {
    return currentState.set('frame', null);
});


export function clearSelections() {
    tracksSubject.value.forEach((track) => {
        tracksSubject.next(
            tracksSubject.value.setIn([track.id, 'selections'], new List())
        )
    })
}

export const deleteSelections = dispatch((currentState) => {
    currentState.selections.forEach((selection) => {
        const { range: selectionRange, segmentId, trackId } = selection;
        splitSegment(trackId, segmentId, selectionRange);
        deleteTrackSegment(trackId, segmentId);
    });

    return currentState.delete('selections');
})

export const setSegmentSelection = dispatch((currentState, trackId, segmentId, range) => {
    const selection = new TimeRangeSelection({
        segmentId,
        range,
        trackId,
    });

    const next = currentState.updateIn(['selections'], (selections) => {
        return selections.push(selection)
    });

    return next;
});


export const selectionSym = Symbol();
register(selectionSym, wireObservable(stream));
