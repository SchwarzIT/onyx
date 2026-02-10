/**
 * Checks whether the given value is a valid `Date` object.
 *
 * @example isValidDate(new Date()) // true
 * @example isValidDate(new Date("not-a-date")) // false
 * @example isValidDate("definitely-not-a-date") // false
 */
export const isValidDate = (date: unknown): date is Date =>
  date instanceof Date && !isNaN(date.getTime());

/**
 *
 * @param date The JS Date object to convert
 * @param type If the formatted string should include the time and if so, with UTC timezone or as local time.
 * @returns Returns a full date-only ISO8601 complaint string, which is also parsable by new Date()
 *
 * @example dateToISOString(new Date("2025-10-16T11:01:09.564Z", "date")) // "2025-10-16"
 * @example dateToISOString(new Date("2025-10-16T11:01:09.564Z", "datetime-utc")) // "2025-10-16T11:01:09.564Z"
 * @example dateToISOString(new Date("2025-10-16T13:01:09.564Z", "datetime-local")) // "2025-10-16T13:01:09.564"
 * @example dateToISOString(new Date("not-a-date")) // undefined
 */
export const dateToISOString = (
  date: Date | undefined,
  type: "date" | "datetime-utc" | "datetime-local",
): string | undefined => {
  if (!isValidDate(date)) {
    return undefined;
  }
  const dateString = date.toISOString();
  if (type === "datetime-utc") {
    return dateString;
  }

  const yearString = date.getFullYear().toString().padStart(4, "0");
  const monthString = (date.getMonth() + 1).toString().padStart(2, "0");
  const dayString = date.getDate().toString().padStart(2, "0");
  const dateOnlyString = `${yearString}-${monthString}-${dayString}`;
  if (type === "date") {
    return dateOnlyString;
  }

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${dateOnlyString}T${hours}:${minutes}`;
};
