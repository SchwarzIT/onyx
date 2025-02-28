import type { HTMLAttributes } from "vue";

/**
 * Gets all possible keys in a union.
 */
export type KeysOfUnion<T> = T extends T ? keyof T : never;

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
 * Pick a value form `T` for the key `K`, if it exists.
 */
export type MaybePick<T, K> = K extends keyof T ? T[K] : never;

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
export type Data = Record<string, unknown>;
