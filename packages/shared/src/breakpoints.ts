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

export const ONYX_MAX_WIDTHS = {
  md: ONYX_BREAKPOINTS.lg - 1,
  lg: ONYX_BREAKPOINTS.xl - 1,
} as const;

export type OnyxBreakpoint = keyof typeof ONYX_BREAKPOINTS;
