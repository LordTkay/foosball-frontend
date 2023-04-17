export function deepClone<T extends object | undefined | null>(object: T) {
    return object ? JSON.parse(JSON.stringify(object)) as T : null
}
