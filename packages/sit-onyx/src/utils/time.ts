/**
 * Calculate seconds, minutes and hours for a given number of milliseconds.
 */
export const getTimeFragments = (time: number) => {
  const hours = Math.floor(time / 60000 / 60);
  const minutes = Math.floor((time / 60000) % 60);
  const seconds = Math.floor((time % 60000) / 1000);
  return { hours, minutes, seconds };
};

/**
 * Formats a given time into a pretty human readable string.
 *
 * @param time Time in milliseconds.
 * @param format RelativeTimeFormat to use for extracting localized strings for hours, minutes and seconds.
 * @example "04:42 min"
 */
export const formatTime = (timeLeft: number, format: Intl.RelativeTimeFormat) => {
  const { hours, minutes, seconds } = getTimeFragments(timeLeft);
  const formatNumber = (value: number) => value.toString().padStart(2, "0");

  let formattedHours = "";
  let literalText = getRelativeTimeFormatLiteralValue(format.formatToParts(timeLeft, "seconds"));

  if (minutes > 0) {
    literalText = getRelativeTimeFormatLiteralValue(format.formatToParts(timeLeft, "minutes"));
  }

  if (hours > 0) {
    literalText = getRelativeTimeFormatLiteralValue(format.formatToParts(timeLeft, "hours"));
    formattedHours = `${formatNumber(hours)}:`;
  }

  return `${formattedHours}${formatNumber(minutes)}:${formatNumber(seconds)} ${literalText}`;
};

/**
 * Gets the literal value for the parts returned by `Intl.RelativeTimeFormat.formatToParts()`.
 * Will trim and remove trailing dots.
 *
 * @example "min"
 */
const getRelativeTimeFormatLiteralValue = (parts: Intl.RelativeTimeFormatPart[]) => {
  return parts.at(-1)?.value.replace(".", "").trim() ?? "";
};

/**
 * Formats the given time into a duration string that can e.g. be used inside `<time>`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time?retiredLocale=de#a_valid_duration_string
 */
export const timeToDurationString = (timeLeft: number): `PT${number}H${number}M${number}S` => {
  const { hours, minutes, seconds } = getTimeFragments(timeLeft);
  return `PT${hours}H${minutes}M${seconds}S`;
};

/**
 * Parses an RFC 9557 time string (`HH:mm:ss.sssssssss`) and converts it into seconds.
 */
export const parseTimeSeconds = (timeString?: string): number | null => {
  if (!timeString) return null;
  const parts = timeString.split(":").map((p) => Number.parseInt(p, 10));
  if (parts.length < 2 || parts.some(Number.isNaN)) return null;
  return parts[0]! * 3600 + parts[1]! * 60 + (parts[2] || 0);
};
