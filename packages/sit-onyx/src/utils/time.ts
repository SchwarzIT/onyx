/**
 * Calculate seconds, minutes and hours for a given number of milliseconds
 * @param time in milliseconds
 */
const getTimeFragments = (time: number) => {
  const hours = Math.floor(time / 60000 / 60);
  const minutes = Math.floor((time / 60000) % 60);
  const seconds = Math.floor((time % 60000) / 1000);
  return { hours, minutes, seconds };
};

/**
 * Format a given time into a readable string
 * @param timeLeft in milliseconds
 * @param t translation function
 * @returns formatted time string
 */
export const formatTimerTime = (timeLeft: number, f: Intl.RelativeTimeFormat) => {
  const { hours, minutes, seconds } = getTimeFragments(timeLeft);

  let time = "";
  let label = f.formatToParts(timeLeft, "seconds").pop()?.value;

  if (minutes > 0) {
    label = f.formatToParts(timeLeft, "minutes").pop()?.value;
  }

  if (hours > 0) {
    label = f.formatToParts(timeLeft, "hours").pop()?.value;
    time = `${hours.toString().padStart(2, "0")}:`;
  }

  return `${time}${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${label?.trim()}`;
};

/**
 * Format a time into a duration string
 * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-duration-string
 * @param timeLeft in milliseconds
 * @returns duration string
 */
export const formatTimerTimeDuration = (timeLeft: number) => {
  const { hours, minutes, seconds } = getTimeFragments(timeLeft);

  return `PT${hours}H${minutes}M${seconds}S`;
};
