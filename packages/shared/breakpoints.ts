/**
 * All available onyx breakpoints / viewports.
 * Key = breakpoint name, value = width in pixels.
 */
export const ONYX_BREAKPOINTS = {
  "2xs": 320,
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1440,
  xl: 1920,
} as const;

export type OnyxBreakpoint = keyof typeof ONYX_BREAKPOINTS;
