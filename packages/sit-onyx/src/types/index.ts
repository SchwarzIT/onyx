export * from "./colors.js";
export * from "./components.js";
export * from "./fonts.js";
export * from "./i18n.js";
export * from "./utils.js";

export const ORIENTATIONS = ["horizontal", "vertical"] as const;
export type Orientation = (typeof ORIENTATIONS)[number];

export const OPERATING_SYSTEMS = ["macOS", "windows", "generic"] as const;
export type OperatingSystem = (typeof OPERATING_SYSTEMS)[number];
