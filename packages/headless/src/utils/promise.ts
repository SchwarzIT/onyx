export type PromiseParameter<T> = ConstructorParameters<typeof Promise<T>>;
export type Resolve<T = unknown> = Parameters<PromiseParameter<T>[0]>[0];
export type Reject<T = unknown> = Parameters<PromiseParameter<T>[0]>[1];

export const withResolvers = <T>() => {
  let resolve: Resolve<T>, reject: Reject<T>;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {
    resolve: ((v) => resolve(v)) satisfies Resolve<T>,
    reject: ((r) => reject(r)) satisfies Reject<T>,
    promise,
  };
};
