import { IdleState } from './idle';

export class TimelineDrag extends IdleState {
    enter() {
        console.log('enter timeline drag');
    }
    exit() {
        console.log('exit timeline drag');
    }
}
