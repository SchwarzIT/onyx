/**
 * List of available Schwarz internal onyx themes.
 */
export const INTERNAL_THEMES = [
  { id: "digits", name: "Schwarz Digits" },
  { id: "lidl", name: "Lidl" },
  { id: "kaufland", name: "Kaufland" },
  { id: "prezero", name: "Prezero" },
  { id: "schwarzgroup-scos", name: "Schwarz Group / SCOS" },
  { id: "tailwind", name: "Tailwind" },
] as const;

export type InternalTheme = (typeof INTERNAL_THEMES)[number]["id"];
