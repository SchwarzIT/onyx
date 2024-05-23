export type IfDefined<Key extends string, T> =
  T extends NonNullable<unknown>
    ? {
        [key in Key]: T;
      }
    : {
        [key in Key]?: undefined;
      };

export type IsArray<TValue, TMultiple extends boolean = false> = TMultiple extends true
  ? TValue[]
  : TValue;
