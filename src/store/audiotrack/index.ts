import { Record, List } from 'immutable';
import { Rect } from 'util/geometry';

class Color {
    red: number;
    green: number;
    blue: number;
    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    rgb() {
        const { red, green, blue } = this;
        return `rgb(${red}, ${green}, ${blue})`;
    }
}

export class AudioTrack extends Record<{
    title: string;
    id: string;
    segments: List<string>;
    color: Color;
    rect: Rect | null;
    instrumentId: string | null;
}>({
    title: '',
    id: '',
    segments: List(),
    color: new Color(202, 162, 40),
    rect: null,
    instrumentId: null,
}) {

}
