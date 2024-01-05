/**
 * Recursive / deep implementation of TypeScript's built-in `Partial<T>` type.
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/** @see https://stackoverflow.com/a/47058976 */
type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

/** @see https://stackoverflow.com/a/47058976 */
type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
    ? F
    : T extends [infer F, ...infer R]
      ? F extends string
        ? `${F}${D}${Join<Extract<R, string[]>, D>}`
        : never
      : string;

/**
 * Gets a union type of deeply joined keys from an object.
 *
 * @example
 * ```ts
 * // resulting type: "a" | "b.c"
 * const obj = {
 *   a: "test",
 *   b: {
 *     c: "test"
 *   }
 * }
 *
 * ```
 * @see https://stackoverflow.com/a/47058976
 */
export type ObjectToDottedStrings<T extends Record<string, string | object>> = Join<
  PathsToStringProps<T>,
  "."
>;
