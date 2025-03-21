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

export type OnyxBreakpoint = keyof typeof ONYX_BREAKPOINTS;
