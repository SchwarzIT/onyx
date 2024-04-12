export type IfDefined<Key extends string, T> =
  T extends NonNullable<unknown>
    ? {
        [key in Key]: T;
      }
    : {
        [key in Key]?: undefined;
      };
