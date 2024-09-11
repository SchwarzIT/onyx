// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AllKeys<T> = T extends any ? keyof T : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PickType<T, K extends AllKeys<T>> = T extends { [k in K]?: any } ? T[K] : never;

export type Merge<T> = {
  [k in AllKeys<T>]: PickType<T, k>;
};
