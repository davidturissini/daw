export interface StateInterface {
    enter(bsm: BehaviorStateMachine<StateInterface>): void;
    exit(bsm: BehaviorStateMachine<StateInterface>): void;
}

export class BehaviorStateMachine<T extends StateInterface> {
    state: T;

    constructor(state: T) {
        this.state = state;
    }

    enterState(state: T) {
        this.state.exit(this);
        this.state = state;
        state.enter(this);
    }
}
