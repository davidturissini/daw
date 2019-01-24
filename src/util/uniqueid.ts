let id = 0;

export function generateId(): string {
    id += 1;
    return id + '';
}
