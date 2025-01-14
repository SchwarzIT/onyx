import type { ComputedRef, MaybeRefOrGetter } from "vue";

/**
 * Adds the entry with the key `Key` and the value of type `TValue` to a record when it is defined.
 * Then the entry is either undefined or exists without being optional.
 * @example
 * ```ts
 * const _no_error: IfDefined<"b", number> & { a: number } = { a: 1, b: 2 };
 * // Error: Object literal may only specify known properties, and 'b' does not exist in type '{ a: number; }'.
 * const _error: IfDefined<"b", undefined> & { a: number } = { a: 1, b: 2 };
 * ```
 */
export type IfDefined<Key extends string, TValue> =
  TValue extends NonNullable<unknown>
    ? {
        [key in Key]: TValue;
      }
    : unknown;

/**
 * Wraps type `TValue` in an array, if `TMultiple` is true.
 */
export type IsArray<TValue, TMultiple extends boolean = false> = TMultiple extends true
  ? TValue[]
  : TValue;

/**
 * Type for any kind of ref source. Preferably used in combination with vue's `toValue` method
 */
export type MaybeReactiveSource<T> = MaybeRefOrGetter<T> | ComputedRef<T>;
