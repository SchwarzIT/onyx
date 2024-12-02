/**
 * Checks whether the given value is a valid `Date` object.
 *
 * @example isValidDate(new Date()) // true
 * @example isValidDate("not-a-date") // false
 */
export const isValidDate = (date: unknown): date is Date => {
  // isNaN supports Date objects so the type cast here is safe
  return date instanceof Date && !isNaN(date as unknown as number);
};
