import { ValueChangedEvent } from 'wire-service';

export function wireObservable(observable) {
    return function (eventTarget) {
        observable.subscribe(
            (data) => {
                eventTarget.dispatchEvent(
                    new ValueChangedEvent({ data })
                )
            },
            (error) => {
                eventTarget.dispatchEvent(
                    new ValueChangedEvent({ error })
                )
            }
        )
    }
}
