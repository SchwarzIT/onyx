import type { DataGridEntry } from "../../types.js";
import type { DefaultSupportedTypes } from "../index.js";
import type { Compare } from "./types.js";

export const STRING_COMPARE = (a: unknown, b: unknown, collator: Intl.Collator) =>
  collator.compare(String(a), String(b));

export const NUMBER_COMPARE = (a: unknown, b: unknown) => Number(a) - Number(b);

const toComparableTime = (date: Date) =>
  new Date(
    Date.UTC(
      0,
      0,
      1,
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds(),
    ),
  );

/**
 * Compares only the time of two dates, ignoring the date part.
 */
export const TIME_COMPARE = (a: unknown, b: unknown, collator: Intl.Collator) => {
  if (!(a instanceof Date && b instanceof Date)) {
    return STRING_COMPARE(a, b, collator);
  }
  const dateA = toComparableTime(a);
  const dateB = toComparableTime(b);
  return NUMBER_COMPARE(dateA, dateB);
};

export const DEFAULT_COMPARES: Record<PropertyKey, Compare<unknown>> = Object.freeze({
  string: STRING_COMPARE,
  number: NUMBER_COMPARE,
  date: NUMBER_COMPARE,
  "datetime-local": NUMBER_COMPARE,
  // As *time* only shows the time part, we only sort by the time part here.
  time: TIME_COMPARE,
  timestamp: NUMBER_COMPARE,
  skeleton: () => 0,
}) satisfies Record<DefaultSupportedTypes, Compare<DataGridEntry>>;
