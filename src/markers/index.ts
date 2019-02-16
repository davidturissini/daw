import { Tick } from "store/tick";
import { Color } from "util/color";

export enum MarkerVariant {
    Cursor,
    Caret
}

export interface MarkerCursorData {
    color: Color;
    dashed: boolean;
}

export enum MarkerCaretAlign {
    LEFT, CENTER, RIGHT
}

export interface MarkerCaretData {
    markerId: string;
    color: Color;
    align: MarkerCaretAlign;
}

export type MarkerData = MarkerCursorData | MarkerCaretData;

export interface Marker<T extends MarkerData> {
    tick: Tick;
    key: string | number;
    variant: MarkerVariant;
    data: T;
}
