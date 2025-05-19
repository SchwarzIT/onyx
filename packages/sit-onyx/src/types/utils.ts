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
