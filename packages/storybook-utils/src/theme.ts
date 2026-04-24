import { create, type ThemeVars } from "storybook/theming";
import type { Viewport } from "storybook/viewport";
import { ONYX_BREAKPOINTS as RAW_ONYX_BREAKPOINTS, type OnyxBreakpoint } from "./breakpoints.js";

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
  return create({
    // default theme values that are independent of the light/dark mode:
    brandTitle: brandDetails?.brandTitle,
    brandUrl: brandDetails?.brandUrl,
    brandImage: brandDetails?.brandImage,
    brandTarget: "_blank",
    base,

    // same as var(--onyx-radius-md)
    appBorderRadius: remToNumber(getCustomProperty("--onyx-number-radius-300")),
    // same as var(--onyx-radius-component-input)
    inputBorderRadius: remToNumber(getCustomProperty("--onyx-number-radius-200")),

    // custom colors depending on light/dark theme
    ...(base === "light" ? getLightTheme() : getDarkTheme()),
  }) satisfies ThemeVars;
};

const getLightTheme = (): Partial<ThemeVars> => {
  return defineTheme({
    // same as var(--onyx-color-text-icons-primary-intense)
    primaryColor: getCustomProperty("--onyx-color-onyx-neutral-700"),
    // same as var(-onyx-color-component-cta-default)
    secondaryColor: getCustomProperty("--onyx-color-onyx-neutral-850"),
    // same as var(--onyx-color-base-background-blank)
    background: getCustomProperty("--onyx-color-onyx-neutral-100"),
    // same as var(--onyx-color-base-background-tinted)
    contentBackground: getCustomProperty("--onyx-color-onyx-neutral-200"),
    // same as var(--onyx-color-text-icons-neutral-intense)
    text: getCustomProperty("--onyx-color-onyx-neutral-900"),
    // same as var(--onyx-color-text-icons-neutral-medium)
    textMuted: getCustomProperty("--onyx-color-onyx-neutral-700"),
    // same as var(--onyx-color-component-border-neutral)
    border: getCustomProperty("--onyx-color-onyx-neutral-300"),
  });
};

const getDarkTheme = (): Partial<ThemeVars> => {
  return defineTheme({
    primaryColor: getCustomProperty("--onyx-color-onyx-neutral-200"),
    // same as var(-onyx-color-component-cta-default-hover)
    secondaryColor: getCustomProperty("--onyx-color-onyx-teal-700"),
    background: getCustomProperty("--onyx-color-onyx-neutral-850"),
    contentBackground: getCustomProperty("--onyx-color-onyx-neutral-800"),
    text: getCustomProperty("--onyx-color-onyx-neutral-100"),
    textMuted: getCustomProperty("--onyx-color-onyx-neutral-200"),
    border: getCustomProperty("--onyx-color-onyx-neutral-600"),
  });
};

/** Define a full onyx Storybook color theme based on the given a few main colors. */
const defineTheme = (colors: {
  text: string;
  textMuted: string;
  background: string;
  border: string;
  contentBackground: string;
  primaryColor: string;
  secondaryColor: string;
}) => {
  return {
    // UI
    appBg: colors.background,
    appContentBg: colors.contentBackground,
    appPreviewBg: colors.contentBackground,
    appBorderColor: colors.border,

    // Text colors
    colorPrimary: colors.primaryColor,
    colorSecondary: colors.secondaryColor,
    textColor: colors.text,
    textInverseColor: colors.contentBackground,

    // Toolbar default and active/hover colors
    barTextColor: colors.text,
    barBg: colors.background,
    barSelectedColor: colors.primaryColor,
    barHoverColor: colors.primaryColor,

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

    const TYPES: Record<OnyxBreakpoint, Viewport["type"]> = {
      "2xs": "mobile",
      xs: "mobile",
      sm: "tablet",
      md: "tablet",
      lg: "desktop",
      xl: "desktop",
    };

    obj[breakpoint] = {
      name: breakpoint,
      styles: { width: `${width}px`, height: "100%" },
      type: TYPES[breakpoint],
    };
    return obj;
  },
  {} as Record<OnyxBreakpoint, Viewport>,
);

/**
 * Converts a rem string into a numeric value with a rem base of 16.
 * @example "1rem" => 16
 */
const remToNumber = (value: string) => +value.replace("rem", "") * 16;
