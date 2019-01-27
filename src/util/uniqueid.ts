import shortid from 'shortid';

export function generateId(): string {
    return shortid.generate();
}
