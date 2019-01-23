import { Record } from 'immutable';

export class Piano extends Record<{
    id: string;
    instrumentId: string;
}>({
    id: '',
    instrumentId: ''
}) {

}
