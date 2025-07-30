/**
 * Transforms the given string into camelCase.
 */
export const toCamelCase = (value: string) => {
  const a = value.toLowerCase().replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  return a.substring(0, 1).toLowerCase() + a.substring(1);
};
