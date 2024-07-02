export const MathUtils = {
  /**
   * Ensures that a given `number` is or is between a given `min` and `max`.
   */
  clamp: (number: number, min: number, max: number) => Math.max(Math.min(number, max), min),
};
