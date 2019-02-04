export class FiniteStateMachine<StateInputs extends PropertyKey, StateNames extends PropertyKey, StateType extends State> {
    state: StateType;
    previousState: StateType | null;

    enterPreviousState() {
        if (this.previousState) {
            this.transitionToState(this.previousState);
        }
    }

    transitionToState(state: StateType) {
        if(this.state) {
            this.state.exit(this)
        }
        this.previousState = this.state;
        this.state = state;
        this.state.enter(this);
    }

    enterState(name: StateNames, ...args: any[]) {
        const Ctor = this.states[name] as StateCtor<StateType>;
        const state = new Ctor(...args);
        this.transitionToState(state);

    }

    stateInput<T>(name: StateInputs, evt: T, ...args: any[]) {
        const method = this.state[name as any];
        if (method) {
            method.apply(this.state, [this, evt, ...args]);
        }
    }

    states: {[key in StateNames]: StateCtor<StateType>};
}

export interface State {
    enter: (fsm: FiniteStateMachine<any, any, any>) => void;
    exit: (fsm: FiniteStateMachine<any, any, any>) => void;
}

export interface StateCtor<State> {
    new(...args): State;
}
