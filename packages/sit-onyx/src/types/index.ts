export * from "./colors";
export * from "./components";
export * from "./fonts";
export * from "./i18n";
export * from "./themes";
export * from "./utils";

export const ORIENTATIONS = ["horizontal", "vertical"] as const;
export type Orientation = (typeof ORIENTATIONS)[number];
