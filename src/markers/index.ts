import { Tick } from "store/tick";
import { Color } from "util/color";

export enum MarkerVariant {
    Cursor
}

export interface MarkerCursorData {
    color: Color;
    dashed: boolean;
}

export type MarkerData = MarkerCursorData;

export interface Marker<T extends MarkerData> {
    tick: Tick;
    key: string | number;
    variant: MarkerVariant;
    data: T;
}
