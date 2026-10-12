/**
 * Replaces part of an string by a given start and end range.
 */
export const stringSplice = (string: string, start: number, end: number, replacement = "") => {
  const before = string.slice(undefined, start);
  const after = string.slice(end);
  return `${before}${replacement}${after}`;
};

export function capitalize<T extends string>(str: T): Capitalize<T> {
  if (!str) return "" as Capitalize<T>;
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
}
