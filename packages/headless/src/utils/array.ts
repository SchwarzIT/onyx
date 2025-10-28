type Comparer<T> = (a: T, b: T) => boolean;

export const areArraysEqual = <T>(
  arrayA: ReadonlyArray<T>,
  arrayB: ReadonlyArray<T>,
  comparer: Comparer<T> = (a, b) => a === b,
) =>
  arrayA.length === arrayB.length &&
  arrayA.every((value, index) => comparer(value, arrayB[index]!));
