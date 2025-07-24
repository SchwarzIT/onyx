import type { HTMLAttributes } from "vue";

/**
 * Gets all possible keys in a union.
 */
export type KeysOfUnion<T> = T extends T ? keyof T : never;

/**
 * Infer the value types of a record type
 */
export type RecordValues<T> = T extends Record<PropertyKey, infer V> ? V : never;

/**
 * Merge the values for all entries by key.
 */
export type UnionByKey<T> = {
  [Key in T extends NonNullable<T> ? keyof T : never]: T extends { [P in Key]?: infer Value }
    ? Value extends undefined
      ? never
      : Value
    : never;
};

/**
 * Merges two types destructively, right to left:
 * All keys from `Source` are kept as is and only the extraneous keys from `Target` that are not present in `Source` are copied over.
 *
 * @example
 * ```ts
 * type Result = Merge<{ a: number; b: string }, { b: boolean, c: unknown }> // => { a: number; b: boolean, c: unknown }
 * ```
 */
export type Merge<Target, Source> = {
  [P in Exclude<keyof Target, keyof Source>]: Target[P];
} & Source;

/**
 * Merges all types destructively from left to right:
 * For duplicated keys only the type from the right most occurring entry is kept.
 *
 * This is similar to the inferred type of a destructuring merge: `{ ...{ a: 1, b: "str" }, ...{ b: true }, ...{ b: 2 } }`.
 *
 * @example
 * ```ts
 * type Result = MergeAll<[{ a: number; b: string }, { b: boolean, c: unknown }, { b: number }]> // => { a: number; b: number, c: unknown }
 * ```
 */
export type MergeAll<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? Rest extends []
    ? First
    : Merge<First, MergeAll<Rest>>
  : never;

/**
 * Pick a value from `T` for the key `K`, if it exists.
 */
export type MaybePick<T, Key, Fallback = never> = Key extends keyof T ? T[Key] : Fallback;

/**
 * Recursive / deep implementation of TypeScript's built-in `Partial<T>` type.
 */
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

/**
 * Adds all native HTML attributes to the given type.
 */
export type WithHTMLAttributes<
  T,
  TAttributes extends HTMLAttributes = HTMLAttributes,
> = TAttributes & T;

/**
 * Generic data object.
 */
export type Data<T = unknown> = Record<string, T>;

/**
 * Simple Wrapper for extends type checking.
 * Returns the passed type if it extends the specified `Extends` type, and `Else` type otherwise.
 */
export type IfExtends<T, Extends, Else = never> = T extends Extends ? T : Else;

/**
 * Returns the passed type if not empty, and `Else` type otherwise.
 */
export type IfNotEmpty<T, Else = never> = T extends Record<PropertyKey, never> ? Else : T;

/**
 * Simple "Native"/"Primitive" JavaScript types, that do not wrap other types.
 */
export type PrimitiveType = null | number | string | boolean | symbol;

/**
 * A type that can also be null or undefined.
 */
export type Nullable<T = never> = T | undefined | null;
