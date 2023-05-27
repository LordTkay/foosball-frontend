export type SortDirection = 'asc' | 'desc'
export type SortFn<T> = (a: T, b: T, direction: SortDirection) => number
export type SortAttribute<T> = keyof T | SortFn<T>
