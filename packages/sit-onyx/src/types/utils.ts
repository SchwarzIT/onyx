/**
 * Recursive / deep implementation of TypeScript's built-in `Partial<T>` type.
 */
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

// TODO: remove. Used as a temporary workaround to ensure duplicated props stay in sync
export type Equals<A extends never> = A;
export type TypeEqualityGuard<A, B, C = Required<A>, D = Required<B>> =
  | Exclude<C, D>
  | Exclude<D, C>;
