import type { injectI18n } from "src/i18n";

/**
 *
 * @param timeLeft in milliseconds
 * @param t translation function
 * @returns formatted time string
 */
export const formatTimeLeft = (timeLeft: number, t: ReturnType<typeof injectI18n>["t"]) => {
  const hours = Math.floor(timeLeft / 60000 / 60);
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

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

//TODO:
export const formatTimeLeftHtmlAttribute = (timeLeft: number) => {
  return timeLeft.toString();
};
