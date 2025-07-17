export type SingleOrderableMapping<T, TOutput = T, TInput = Readonly<TOutput>> = {
  func: (input: TInput) => TInput | TOutput;
  order?: number;
};

/**
 * One pattern that we use and provide in the feature API is the ability to provide mappers for configurations and data.
 * The `OrderableMapping` is an abstraction of this pattern, where any count of mappers can be defined.
 */
export type OrderableMapping<T> = SingleOrderableMapping<T> | SingleOrderableMapping<T>[];

/**
 * Unwraps and orders the mappers for a given key of a feature set.
 * The returned array of mappings can then be applied using the `applyMapping` function.
 */
export const prepareMapping = <
  T,
  F extends { [Key in K]?: OrderableMapping<T> | undefined }[],
  K extends PropertyKey,
>(
  features: F,
  key: K,
) =>
  features
    .flatMap((f) => f[key]!)
    .filter((f) => f?.func)
    .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));

export const applyMapping = <T>(mapping: SingleOrderableMapping<T>[], input: T) =>
  mapping.reduce((output, m) => m.func(output), input);
