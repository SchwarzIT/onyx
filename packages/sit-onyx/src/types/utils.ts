/**
 * Recursive / deep implementation of TypeScript's built-in `Partial<T>` type.
 */
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

/**
 * Recursive type to allow passing additional properties to a given object.
 * It doesn't alter the original type but allows nested objects to have additional properties not defined in the original type.
 */
export type DeepExtendable<T> = T extends object
  ? { [K in keyof T]: DeepExtendable<T[K]> } & { [key: string]: unknown }
  : T;
