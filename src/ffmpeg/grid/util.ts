import { GridFSM } from "./states/types";

const { keys } = Object;

export function getRowIndex(y: number, rowFrames: GridFSM['rowFrames']): string {
    const rowY = y;
    const rowKey = keys(rowFrames).find((key) => {
        const rowFrame = rowFrames[key];
        return (rowFrame.rect.y + rowFrame.rect.height > rowY);
    });

    if (typeof rowKey !== 'string') {
        throw new Error(`Could not find row from "${y}" pixels`);
    }
    return rowKey;
}
