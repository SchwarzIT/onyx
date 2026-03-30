import { computed, type Ref } from "vue";

/**
 * Sanitizes the given string value to ensure its format is only "HH:MM" or "HH:MM:SS".
 */
export const sanitizeTimeForNativeInput = (value?: string, showSeconds?: boolean): string => {
  if (typeof value !== "string") return "";
  if (showSeconds) {
    const match = value.match(/^\d{2}:\d{2}(?::\d{2})?/);
    return match ? match[0] : "";
  }

  const match = value.match(/^\d{2}:\d{2}/);
  return match ? match[0] : "";
};

/**
 * Creates an RFC time value (HH:MM or HH:MM:SS) from the given times.
 */
export const createTimeString = (
  hours: number,
  minutes: number,
  seconds: number,
  showSeconds: boolean,
) => {
  const hh = hours.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");
  return `${hh}:${mm}${showSeconds ? `:${ss}` : ""}`;
};

/**
 * Parses the time parts (hours, minutes etc.) from the given time string.
 */
export const parseTimeString = (showSeconds: boolean, string?: string) => {
  const time = sanitizeTimeForNativeInput(string, showSeconds);
  const [hours = 0, minutes = 0, seconds = 0] = time.split(":").map((value) => Number(value) || 0);
  return { hours, minutes, seconds };
};

/**
 * Composable for managing a time value with AM/PM formatting.
 * While derive the time format (am or pm) from the given time and update the value when the am/pm toggle is switched.
 */
export const useAmPmValue = (value: Ref<string | undefined>, showSeconds: Ref<boolean>) => {
  const timeSuffix = computed({
    // always derive the suffix directly from the current 24h value
    get(): "am" | "pm" {
      if (!value.value) return "am";
      const { hours } = parseTimeString(showSeconds.value, value.value);
      return hours >= 12 ? "pm" : "am";
    },

    // when the user toggles the suffix, calculate the new 24h string
    set(newSuffix: "am" | "pm") {
      if (!value.value) return;

      const { hours, minutes, seconds } = parseTimeString(showSeconds.value, value.value);
      const currentSuffix = hours >= 12 ? "pm" : "am";

      // only update if the suffix is actually changing
      if (currentSuffix !== newSuffix) {
        // use modulo math to handle the 12 o'clock edge cases automatically
        const newHours = newSuffix === "pm" ? (hours % 12) + 12 : hours % 12;
        value.value = createTimeString(newHours, minutes, seconds, showSeconds.value);
      }
    },
  });

  return { timeSuffix };
};
