/**
 * Gets a union type from an object that contains all combinations of nested keys as arrays.
 *
 * @see https://stackoverflow.com/a/47058976
 * @example
 * ```ts
 * type Test = ObjectToKeyPaths<{ a: "foo"; b: { c: "bar"; d: "baz" } }>;
 * // type Test = ["a"] | ["b", "c"] | ["b", "d"]
 * ```
 */
type ObjectToKeyPaths<T> = T extends string
  ? []
  : { [K in Extract<keyof T, string>]: [K, ...ObjectToKeyPaths<T[K]>] }[Extract<keyof T, string>];

/**
 * Joins the elements in the given type `T` with the separator `D`.
 *
 * @see https://stackoverflow.com/a/47058976
 * @example
 * ```ts
 * type Test = Join<["foo", "bar"], ".">
 * // type Test = "foo.bar"
 * ```
 */
type Join<T extends unknown[], D extends string> = T extends []
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
 *
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
export type TranslationValue = string | NestedMessage;

/**
 * Gets a union type of deeply joined keys from an object.
 *
 * @example
 * ```ts
 * ObjectToDottedStrings<{
 *   a: "test",
 *   b: { c: "test" }
 * }>
 * // results in: "a" | "b.c"
 * ```
 * @see https://stackoverflow.com/a/47058976
 */
export type ObjectToDottedStrings<T extends TranslationValue> = Join<ObjectToKeyPaths<T>, ".">;
