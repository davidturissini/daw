import { register } from 'wire-service';
import { BehaviorSubject } from 'rxjs';
import { Record } from 'immutable';
import { wireObservable } from './../util/wire-observable';

class Selection extends Record({
    frame: null,
}) {

}


const selectionSubject = new BehaviorSubject(null);
const stream = selectionSubject.asObservable();

function dispatch(func) {
    return function (...args) {
        const nextState = func(...args);
        selectionSubject.next(nextState);
    }
}

export const setSelectionFrame = dispatch(function (frame) {
    return new Selection({ frame });
});

export const clearSelectionFrame = dispatch(function () {
    return null;
});


export const selectionSym = Symbol();
register(selectionSym, wireObservable(stream));
