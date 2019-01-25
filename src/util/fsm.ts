export interface StateInterface {
    enter(fsm: FiniteStateMachine<any, any, any>): void;
    exit(fsm: FiniteStateMachine<any, any, any>): void;
}

interface StateCtor<T extends StateInterface> {
    new(...args): T;
}

export class FiniteStateMachine<S extends string, I extends string, T extends StateInterface> {
    stateMap: {[key: string]: StateCtor<T> }
    state: T;

    constructor(initial: S, stateMap: {[key: string]: StateCtor<T>}) {
        this.stateMap = stateMap;
        this.state = new stateMap[initial];
        this.state.enter(this);
    }

    enterState(stateName: S, args: any[]) {
        const Ctor = this.stateMap[stateName];
        this.state.exit(this);
        const state = new Ctor(...args);
        state.enter(this);
        this.state = state;
    }

    input(name: I, args: any[]) {
        const method = (this.state as any)[name];
        if (method) {
            method(this, ...args);
        }
    }
}
