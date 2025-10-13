export function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return weekNo;
}

/**
 * Checks whether the given date is in between the given start and end date.
 */
export function isInDateRange(date: Date, start: Date, end: Date) {
  start = new Date(start);
  start.setHours(0, 0, 0, 0);

  end = new Date(end);
  end.setHours(23, 59, 59, 999);

  const time = date.getTime();
  return time >= start.getTime() && time <= end.getTime();
}

export function getNormalizedDayIndex(date: Date, weekStartDay: Weekday) {
  const day = date.getDay();
  const start = WEEKDAYS.indexOf(weekStartDay);
  const normalizedDay = day === 0 ? 6 : day - 1;
  return (normalizedDay - start + 7) % 7;
}

export const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
export type Weekday = (typeof WEEKDAYS)[number];

export type DateValue = Date | string | number;
