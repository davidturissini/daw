import { Record, List } from 'immutable';
import { Rect } from 'util/geometry';
import { Color } from 'util/color';

export class AudioTrack extends Record<{
    title: string;
    id: string;
    segments: List<string>;
    color: Color;
    rect: Rect | null;
    instrumentId: string;
}>({
    title: '',
    id: '',
    segments: List(),
    color: new Color(202, 162, 40),
    rect: null,
    instrumentId: '',
}) {

}
