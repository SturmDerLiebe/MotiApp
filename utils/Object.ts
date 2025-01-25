export function areAnyFieldsPredicate<T extends Record<string, unknown>>(
    obj: T,
    predicate: (value: T[keyof T]) => boolean,
) {
    return Object.values<T[keyof T]>(obj as { [key: string]: T[keyof T] }).some(
        predicate,
    );
}
