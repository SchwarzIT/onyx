export const DATETIME_FORMATS = {
  date: { dateStyle: "medium" },
  "datetime-local": { dateStyle: "medium", timeStyle: "short" },
  time: { timeStyle: "short" },
  timestamp: {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "shortOffset",
  },
} satisfies Record<string, Intl.DateTimeFormatOptions>;

export type DatetimeFormat = keyof typeof DATETIME_FORMATS;
