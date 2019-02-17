export interface Decibel {
    value: number;
}

export function decibel(value: number): Decibel {
    return { value };
}
