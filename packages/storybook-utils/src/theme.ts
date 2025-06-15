import {
  ONYX_BREAKPOINTS as RAW_ONYX_BREAKPOINTS,
  type OnyxBreakpoint,
} from "@sit-onyx/shared/breakpoints";
import { create, type ThemeVars } from "storybook/internal/theming";

export type BrandDetails = Pick<ThemeVars, "brandTitle" | "brandImage" | "brandUrl">;

/**
 * Get the computed value for a CSS custom property.
 * Per default the property value is taken from the body element.
 */
export const getCustomProperty = (property: string, el: Element = document.body) =>
  getComputedStyle(el).getPropertyValue(property);

/**
 * Creates a custom theme for Storybook that uses onyx colors.
 *
 * @see https://storybook.js.org/docs/react/configure/theming#create-a-theme-quickstart
 */
export const createTheme = (base: "light" | "dark" = "light", brandDetails?: BrandDetails) => {
  const primaryColor = getCustomProperty("--onyx-color-onyx-500");
  return create({
    brandTitle: brandDetails?.brandTitle,
    brandUrl: brandDetails?.brandUrl,
    brandImage: brandDetails?.brandImage,
    brandTarget: "_blank",
    base,

    // default theme values that are independent of the light/dark mode:
    colorPrimary: primaryColor,
    colorSecondary: getCustomProperty("--onyx-color-themed-secondary-500"),
    barSelectedColor: primaryColor,
    barHoverColor: primaryColor,
    appBorderRadius: remToNumber(getCustomProperty("--onyx-number-radius-300")),
    inputBorderRadius: remToNumber(getCustomProperty("--onyx-number-radius-200")),

    // custom colors depending on light/dark theme
    ...(base === "light" ? getLightTheme() : getDarkTheme()),
  }) satisfies ThemeVars;
};

const getLightTheme = (): Partial<ThemeVars> => {
  return defineTheme({
    background: getCustomProperty("--onyx-color-universal-grayscale-white"),
    contentBackground: getCustomProperty("--onyx-color-steel-100"),
    text: getCustomProperty("--onyx-color-steel-700"),
    textMuted: getCustomProperty("--onyx-color-steel-600"),
    border: getCustomProperty("--onyx-color-steel-300"),
  });
};

const getDarkTheme = (): Partial<ThemeVars> => {
  return defineTheme({
    background: getCustomProperty("--onyx-color-steel-1100"),
    contentBackground: getCustomProperty("--onyx-color-steel-1200"),
    text: getCustomProperty("--onyx-color-steel-200"),
    textMuted: getCustomProperty("--onyx-color-steel-400"),
    border: getCustomProperty("--onyx-color-steel-900"),
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
