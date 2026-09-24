/**
 * Replaces part of an string by a given start and end range.
 */
export const stringSplice = (string: string, start: number, end: number, replacement = "") => {
  const before = string.slice(undefined, start);
  const after = string.slice(end);
  return `${before}${replacement}${after}`;
};
