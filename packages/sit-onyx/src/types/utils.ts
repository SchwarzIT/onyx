import type { HTMLAttributes } from "vue";

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
