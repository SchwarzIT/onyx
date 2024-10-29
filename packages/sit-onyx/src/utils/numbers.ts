/**
 * Checks if a given number is divisible by a specified precision.
 *
 * @param number - The number to check for divisibility.
 * @param precision - The precision (step size) to check divisibility against.
 * @returns `true` if `number` is divisible by `precision`, otherwise `false`.
 */
export const isDivisible = (number: number, precision: number): boolean => {
  const quotient = number / precision;
  return quotient % 1 === 0;
};
/**
 * Applies minimum and maximum limits to a given number.
 *
 * @param number - The number to limit.
 * @param min - The minimum value allowed, or `undefined` for no minimum limit.
 * @param max - The maximum value allowed, or `undefined` for no maximum limit.
 * @returns The adjusted number, constrained within the specified min and max bounds.
 */
export const applyLimits = (
  number: number,
  min: number | undefined,
  max: number | undefined,
): number => {
  const minLimit = min ?? -Infinity;
  const maxLimit = max ?? Infinity;
  return Math.min(Math.max(number, minLimit), maxLimit);
};

/**
 * Rounds a number to a specified precision and returns it as a string.
 * Supports both decimal and whole-number rounding based on the precision provided.
 *
 * @param value - The number to round, or `undefined` to return an empty string.
 * @param precision - The number of decimal places for rounding (e.g., 0.01 for 2 decimals).
 * @returns The rounded number as a string. Returns an empty string if `value` is `undefined`.
 */
export const roundToPrecision = (value: number | undefined, precision: number): string => {
  if (value === undefined) return "";
  if (precision > 0) {
    return value.toFixed(precision);
  }
  const places = precision;
  const factor = Math.pow(10, places);
  return (Math.round(value * factor) / factor).toString();
};
