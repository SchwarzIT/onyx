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
 * @param precision - The number of decimal places for rounding (e.g., 0.01 for 2 decimals). Can also be negative.
 * @returns The rounded number as a string. Returns an empty string if `value` is `undefined`.
 */
export const roundToPrecision = (value: number | undefined, precision: number): string => {
  if (!value) return "";
  if (precision >= 0) return value.toFixed(precision);
  const factor = Math.pow(10, precision);
  return (Math.round(value * factor) / factor).toString();
};

/**
 * Data size (with binary prefix). Represents a multiple of 1024 bytes.
 *
 * @example "4Mi" = 4 * 1024 * 1024 = 4_194_304 bytes
 */
export type BinaryPrefixedSize = `${number}${IECPrefixSymbol}`;

/**
 * IEC prefix symbols.
 *
 * @see https://en.wikipedia.org/wiki/Binary_prefix
 */
export const IEC_PREFIX_SYMBOLS = [
  "Ki",
  "Mi",
  "Gi",
  "Ti",
  "Pi",
  "Ei",
  "Zi",
  "Yi",
  "Ri",
  "Qi",
] as const;

/**
 * IEC prefix symbol.
 *
 * @see https://en.wikipedia.org/wiki/Binary_prefix
 */
export type IECPrefixSymbol = (typeof IEC_PREFIX_SYMBOLS)[number];

/**
 * Converts a [binary prefixed size](https://en.wikipedia.org/wiki/Binary_prefix) to its decimal representation in bytes.
 */
export const convertBinaryPrefixToBytes = (size: BinaryPrefixedSize): number => {
  const prefixSymbol = size.substring(size.length - 2) as IECPrefixSymbol;
  const power = IEC_PREFIX_SYMBOLS.indexOf(prefixSymbol) + 1;
  const multiplier = +size.substring(0, size.length - 2);
  return multiplier * 1024 ** power;
};
