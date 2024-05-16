import type { injectI18n } from "src/i18n";

/**
 *
 * @param time in milliseconds
 */
const getTimeFragments = (time: number) => {
  const hours = Math.floor(time / 60000 / 60);
  const minutes = Math.floor((time / 60000) % 60);
  const seconds = Math.floor((time % 60000) / 1000);
  return { hours, minutes, seconds };
};

/**
 * @param timeLeft in milliseconds
 * @param t translation function
 * @returns formatted time string
 */
export const formatTimerTime = (timeLeft: number, t: ReturnType<typeof injectI18n>["t"]) => {
  const { hours, minutes, seconds } = getTimeFragments(timeLeft);

  let time = "";
  let label = t.value("time.seconds", { n: seconds });

  if (minutes > 0) {
    label = t.value("time.minutes", { n: minutes });
  }

  if (hours > 0) {
    label = t.value("time.hours", { n: hours });
    time = `${hours.toString().padStart(2, "0")}:`;
  }

  return `${time}${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${label}`;
};

// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-duration-string
export const formatTimerTimeDuration = (timeLeft: number) => {
  const { hours, minutes, seconds } = getTimeFragments(timeLeft);

  return `PT0H${hours}M${minutes}S${seconds}`;
};
