/**
 * List of available Schwarz internal onyx themes.
 */
export const INTERNAL_THEMES = [
  { id: "digits", name: "Schwarz Digits", packageName: "@onyx-internal/digits-theme" },
  { id: "lidl", name: "Lidl", packageName: "@onyx-internal/lidl-theme" },
  { id: "kaufland", name: "Kaufland", packageName: "@onyx-internal/kaufland-theme" },
  { id: "prezero", name: "Prezero", packageName: "@onyx-internal/prezero-theme" },
  {
    id: "schwarzgroup-scos",
    name: "Schwarz Group / SCOS",
    packageName: "@onyx-internal/schwarzgroup-scos-theme",
  },
  { id: "tailwind", name: "Tailwind", packageName: "@onyx-internal/tailwind-theme" },
] as const;

export type InternalTheme = (typeof INTERNAL_THEMES)[number]["id"];
