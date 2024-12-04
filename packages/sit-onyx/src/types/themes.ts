export const ONYX_THEMES = ["onyx", "digits", "kaufland", "lidl", "schwarz"] as const;
export type OnyxTheme = (typeof ONYX_THEMES)[number];
