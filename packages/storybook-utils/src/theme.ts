import type { ThemeVars, ThemeVarsPartial } from "@storybook/theming";
import { create } from "@storybook/theming/create";
import onyxVariables from "../../sit-onyx/src/styles/variables-onyx.json";
import storybookLogo from "./assets/logo-storybook-default.svg";
import storybookLogoInverse from "./assets/logo-storybook-inverse.svg";

/**
 * Creates a custom theme for Storybook that uses Onyx colors.
 *
 * @see https://storybook.js.org/docs/react/configure/theming#create-a-theme-quickstart
 */
export const createTheme = (
  options?: Pick<ThemeVarsPartial, "base" | "brandTitle" | "brandImage" | "brandUrl">,
) => {
  const base = options?.base ?? "light";
  const defaultBrandImage = base === "light" ? storybookLogo : storybookLogoInverse;
  const primaryColor = onyxVariables["onyx-color-brand-primary-500"];

  return create({
    brandTitle: options?.brandTitle ?? "Onyx Storybook",
    brandUrl: options?.brandUrl ?? "https://onyx.schwarz",
    brandImage: options?.brandImage ?? defaultBrandImage,
    brandTarget: "_blank",
    base: base,

    // default theme values that are independent of the light/dark mode:
    colorPrimary: primaryColor,
    colorSecondary: onyxVariables["onyx-color-brand-secondary-500"],
    barSelectedColor: primaryColor,
    barHoverColor: primaryColor,
    appBorderRadius: remToNumber(onyxVariables["onyx-number-radius-400"]),
    inputBorderRadius: remToNumber(onyxVariables["onyx-number-radius-300"]),

    // custom colors depending on light/dark theme
    ...(base === "light" ? getLightTheme() : getDarkTheme()),
  }) satisfies ThemeVars;
};

const getLightTheme = (): Partial<ThemeVars> => {
  return defineTheme({
    background: onyxVariables["onyx-color-universal-grey-white"],
    contentBackground: onyxVariables["onyx-color-brand-neutral-100"],
    text: onyxVariables["onyx-color-brand-neutral-800"],
    textMuted: onyxVariables["onyx-color-brand-neutral-900"],
    border: onyxVariables["onyx-color-brand-neutral-200"],
  });
};

const getDarkTheme = (): Partial<ThemeVars> => {
  return defineTheme({
    background: onyxVariables["onyx-color-brand-neutral-1100"],
    contentBackground: onyxVariables["onyx-color-brand-neutral-1200"],
    text: onyxVariables["onyx-color-brand-neutral-200"],
    textMuted: onyxVariables["onyx-color-brand-neutral-300"],
    border: onyxVariables["onyx-color-brand-neutral-1000"],
  });
};

/** Define a full Onyx Storybook color theme based on the given 5 main colors. */
const defineTheme = (colors: {
  text: string;
  textMuted: string;
  background: string;
  border: string;
  contentBackground: string;
}) => {
  return {
    // UI
    appBg: colors.background,
    appContentBg: colors.contentBackground,
    appPreviewBg: colors.contentBackground,
    appBorderColor: colors.border,

    // Text colors
    textColor: colors.text,
    textInverseColor: colors.contentBackground,

    // Toolbar default and active/hover colors
    barTextColor: colors.text,
    barBg: colors.background,

    // Form colors
    inputBg: colors.background,
    inputBorder: colors.border,
    inputTextColor: colors.text,
    booleanBg: colors.background,
    booleanSelectedBg: colors.contentBackground,
    buttonBg: colors.background,
    buttonBorder: colors.border,
    textMutedColor: colors.textMuted,
  } satisfies Partial<ThemeVars>;
};

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

/**
 * Converts a rem string into a numeric value with a rem base of 16.
 * @example "1rem" => 16
 */
const remToNumber = (value: string) => +value.replace("rem", "") * 16;
