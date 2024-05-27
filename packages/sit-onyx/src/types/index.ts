export * from "./breakpoints";
export * from "./colors";
export * from "./components";
export * from "./fonts";
export * from "./i18n";
export * from "./utils";

export const DIRECTIONS = ["horizontal", "vertical"] as const;
export type Direction = (typeof DIRECTIONS)[number];
