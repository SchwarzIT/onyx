export const ONYX_COLORS = [
  "primary",
  "secondary",
  "neutral",
  "danger",
  "warning",
  "success",
  "info",
] as const;
export type OnyxColor = (typeof ONYX_COLORS)[number];

/**
 * List of available pre-build onyx themes.
 */
export const ONYX_THEMES = ["onyx", "lidl", "kaufland", "twogo"] as const;
