import onyxVariables from "sit-onyx/themes/onyx.json";
import { ONYX_BREAKPOINTS as RAW_ONYX_BREAKPOINTS, type OnyxBreakpoint } from "sit-onyx/types";
import { create, type ThemeVars, type ThemeVarsPartial } from "storybook/internal/theming";
import onyxLogo from "./assets/logo-onyx.svg";

/**
 * Creates a custom theme for Storybook that uses onyx colors.
 *
 * @see https://storybook.js.org/docs/react/configure/theming#create-a-theme-quickstart
 */
export const createTheme = (
  options?: Pick<ThemeVarsPartial, "base" | "brandTitle" | "brandImage" | "brandUrl">,
) => {
  const base = options?.base ?? "light";
  const primaryColor = onyxVariables["onyx-color-themed-primary-500"];

  return create({
    brandTitle: options?.brandTitle ?? "onyx Storybook",
    brandUrl: options?.brandUrl ?? "https://onyx.schwarz",
    brandImage: options?.brandImage ?? onyxLogo,
    brandTarget: "_blank",
    base: base,

    // default theme values that are independent of the light/dark mode:
    colorPrimary: primaryColor,
    colorSecondary: onyxVariables["onyx-color-themed-secondary-500"],
    barSelectedColor: primaryColor,
    barHoverColor: primaryColor,
    appBorderRadius: remToNumber(onyxVariables["onyx-number-radius-300"]),
    inputBorderRadius: remToNumber(onyxVariables["onyx-number-radius-200"]),

    // custom colors depending on light/dark theme
    ...(base === "light" ? getLightTheme() : getDarkTheme()),
  }) satisfies ThemeVars;
};

const getLightTheme = (): Partial<ThemeVars> => {
  return defineTheme({
    background: onyxVariables["onyx-color-universal-grayscale-white"],
    contentBackground: onyxVariables["onyx-color-themed-neutral-100"],
    text: onyxVariables["onyx-color-themed-neutral-700"],
    textMuted: onyxVariables["onyx-color-themed-neutral-600"],
    border: onyxVariables["onyx-color-themed-neutral-300"],
  });
};

const getDarkTheme = (): Partial<ThemeVars> => {
  return defineTheme({
    background: onyxVariables["onyx-color-themed-neutral-1100"],
    contentBackground: onyxVariables["onyx-color-themed-neutral-1200"],
    text: onyxVariables["onyx-color-themed-neutral-200"],
    textMuted: onyxVariables["onyx-color-themed-neutral-400"],
    border: onyxVariables["onyx-color-themed-neutral-900"],
  });
};

/** Define a full onyx Storybook color theme based on the given 5 main colors. */
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

/** All available Storybook breakpoints / viewports supported by onyx. */
export const ONYX_BREAKPOINTS = Object.entries(RAW_ONYX_BREAKPOINTS).reduce(
  (obj, [name, width]) => {
    const breakpoint = name as OnyxBreakpoint;
    obj[breakpoint] = { name: breakpoint, styles: { width: `${width}px`, height: "100%" } };
    return obj;
  },
  {} as Record<OnyxBreakpoint, StorybookBreakpoint>,
);

export type StorybookBreakpoint = {
  name: OnyxBreakpoint;
  styles: {
    width: string;
    height: string;
  };
};

/**
 * Converts a rem string into a numeric value with a rem base of 16.
 * @example "1rem" => 16
 */
const remToNumber = (value: string) => +value.replace("rem", "") * 16;
