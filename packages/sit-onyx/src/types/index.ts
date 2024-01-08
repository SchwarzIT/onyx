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

type NestedMessage = { [key: string]: string | NestedMessage };

/**
 * Translation value. Can either by a string or nested object with more translation values.
 * @example
 * ```ts
 * // simple value
 * { someKey: "Hello World" }
 *
 * // nested value
 * {
 *   someKey: {
 *     someOtherKey: "Hello World"
 *   }
 * }
 * ```
 */
export type TranslationValue = string | { [key: string]: string | NestedMessage };

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
export type ObjectToDottedStrings<T extends TranslationValue> = Join<PathsToStringProps<T>, ".">;
