export const MathUtils = {
  /**
   * Ensures that a given `number` is or is between a given `min` and `max`.
   */
  clamp: (number: number, min: number, max: number) => Math.max(Math.min(number, max), min),
  /**
   * Returns the count of decimal places in a number.
   * @param number - The number to check.
   * @returns The count of decimal places.
   *
   * decimals(1.23); // 2
   * decimals(10);   // 0
   */
  decimalsCount: (number: number) => String(number).split(".")[1]?.length ?? 0,
  /**
   *  Converts a value within a range to a percentage (0-100).
   *
   * @param value - The value to convert.
   * @param min - The minimum allowed value.
   * @param max - The maximum allowed value.
   * @returns The percentage representation of the value.
   */
  valueToPercent: (value: number, min: number, max: number) => ((value - min) * 100) / (max - min),
  /**
   * Converts a percentage (0-100) to a value within a range.
   *
   * @param percent - The percentage to convert.
   * @param min - The minimum allowed value.
   * @param max - The maximum allowed value.
   * @returns The value representation of the percentage.
   */
  percentToValue: (percent: number, min: number, max: number) => (max - min) * percent + min,
};
