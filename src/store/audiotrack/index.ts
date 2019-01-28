import { Record, List, Map as ImmutableMap } from 'immutable';
import { Rect } from 'util/geometry';
import { Color } from 'util/color';
import { MidiNote } from 'util/sound';
import { Time } from 'util/time';

export class Loop extends Record<{
    id: string;
    notes: ImmutableMap<string, MidiNote>;
    duration: Time;
}>({
    id: '',
    notes: ImmutableMap(),
    duration: Time.fromSeconds(5)
}) {

}

export class AudioTrack extends Record<{
    title: string;
    id: string;
    segments: List<string>;
    color: Color;
    rect: Rect | null;
    instrumentId: string;
    loops: ImmutableMap<string, Loop>
}>({
    title: '',
    id: '',
    segments: List(),
    color: new Color(202, 162, 40),
    rect: null,
    instrumentId: '',
    loops: ImmutableMap(),
}) {

}
