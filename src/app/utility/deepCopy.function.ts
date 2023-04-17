export function deepClone<T extends object>(object: T) {
    return JSON.parse(JSON.stringify(object)) as T
}
