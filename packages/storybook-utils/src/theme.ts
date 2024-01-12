/** All available Storybook breakpoints / viewports supported by Onyx. */
export const ONYX_BREAKPOINTS = {
  "2xs": {
    name: "2xs",
    styles: {
      width: "320px",
      height: "100%",
    },
  },
  xs: {
    name: "xs",
    styles: {
      width: "576px",
      height: "100%",
    },
  },
  sm: {
    name: "sm",
    styles: {
      width: "768px",
      height: "100%",
    },
  },
  md: {
    name: "md",
    styles: {
      width: "992px",
      height: "100%",
    },
  },
  lg: {
    name: "lg",
    styles: {
      width: "1440px",
      height: "100%",
    },
  },
  xl: {
    name: "xl",
    styles: {
      width: "1920px",
      height: "100%",
    },
  },
} as const;
