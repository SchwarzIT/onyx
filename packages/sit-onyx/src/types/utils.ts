import type { HTMLAttributes } from "vue";

/**
 * Recursive / deep implementation of TypeScript's built-in `Partial<T>` type.
 */
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

/**
 * Any key that can be used to index and object.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyKey = keyof any;

/**
 * Adds all native HTML attributes to the given type.
 */
export type WithHTMLAttributes<
  T,
  TAttributes extends HTMLAttributes = HTMLAttributes,
> = TAttributes & T;
