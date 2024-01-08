/** All available Storybook breakpoints / viewports supported by Onyx. */
export const ONYX_BREAKPOINTS = {
  xsmall2: {
    name: "xsmall2",
    styles: {
      width: "320px",
      height: "100%",
    },
  },
  xsmall: {
    name: "xsmall",
    styles: {
      width: "576px",
      height: "100%",
    },
  },
  small: {
    name: "small",
    styles: {
      width: "768px",
      height: "100%",
    },
  },
  medium: {
    name: "medium",
    styles: {
      width: "992px",
      height: "100%",
    },
  },
  large: {
    name: "large",
    styles: {
      width: "1440px",
      height: "100%",
    },
  },
  xlarge: {
    name: "xlarge",
    styles: {
      width: "1920px",
      height: "100%",
    },
  },
} as const;
