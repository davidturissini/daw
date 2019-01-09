import { IdleState } from './idle';

export class SelectState extends IdleState {
    enter() {
        console.log('enter select');
    }
    exit() {

    }
}
