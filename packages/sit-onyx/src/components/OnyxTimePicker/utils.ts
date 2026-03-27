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
