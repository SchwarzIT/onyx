import { create, type ThemeVars } from "storybook/theming";
import type { Viewport } from "storybook/viewport";
import { ONYX_BREAKPOINTS as RAW_ONYX_BREAKPOINTS, type OnyxBreakpoint } from "./breakpoints.js";

export type BrandDetails = Pick<ThemeVars, "brandTitle" | "brandImage" | "brandUrl">;

/**
 * Get the computed color for a CSS custom property.
 * Per default the property value is taken from the body element.
 */
export const getCustomColor = (
  property: string,
  base: "light" | "dark" = "light",
  el: Element = document.body,
) => {
  // since CSS properties might contain nested "light-dark()" definitions, we simply create a temp DOM element
  // and get the actual computed color from it to prevent recursive string parsing here
  const tempEl = document.createElement("div");
  tempEl.style.color = `var(${property})`;
  tempEl.style.display = "none";
  tempEl.style.colorScheme = base;
  el.appendChild(tempEl);

  const resolvedColor = getComputedStyle(tempEl).color;
  el.removeChild(tempEl);
  return resolvedColor;
};

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
  const primaryColor = getCustomColor("--onyx-color-text-icons-primary-intense", base);

  return create({
    brandTitle: brandDetails?.brandTitle,
    brandUrl: brandDetails?.brandUrl,
    brandImage: brandDetails?.brandImage,
    brandTarget: "_blank",
    base,

    // default theme values that are independent of the light/dark mode:
    colorPrimary: primaryColor,
    // since Storybook does not support changing the text color of the active sidebar item (that uses secondary as background)
    // we need to use a different color between light/dark here so the text is readable in both modes
    colorSecondary: getCustomColor(
      base === "light"
        ? "--onyx-color-component-cta-default"
        : "--onyx-color-component-cta-default-hover",
      base,
    ),
    barSelectedColor: primaryColor,
    barHoverColor: primaryColor,
    appBorderRadius: remToNumber(getCustomProperty("--onyx-radius-md")),
    inputBorderRadius: remToNumber(getCustomProperty("--onyx-radius-component-input")),

    // custom colors depending on light/dark theme
    ...defineTheme({
      background: getCustomColor("--onyx-color-base-background-blank", base),
      contentBackground: getCustomColor("--onyx-color-base-background-tinted", base),
      text: getCustomColor("--onyx-color-text-icons-neutral-intense", base),
      textMuted: getCustomColor("--onyx-color-text-icons-neutral-medium", base),
      border: getCustomColor("--onyx-color-component-border-neutral", base),
    }),
  }) satisfies ThemeVars;
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
