/**
 * All available onyx breakpoints / viewports.
 * Key = breakpoint name, value = width in pixels.
 */
export const ONYX_BREAKPOINTS = {
  "2xs": 320,
  xs: 577,
  sm: 769,
  md: 993,
  lg: 1441,
  xl: 1921,
} as const;

// "string &" is needed to fix a current Vue issue where a warning is logged for invalid property types
// when this types is used in a union, see:
// https://github.com/SchwarzIT/onyx/issues/3290
export type OnyxBreakpoint = string & keyof typeof ONYX_BREAKPOINTS;
