# Fonts

Below you will find all available fonts variables that are supported by onyx.

<script lang="ts" setup>
import OnyxFontsVariables from "../.vitepress/components/OnyxFontsVariables.vue"

const fontSizes = [
  "onyx-font-size-sm",
  "onyx-font-size-md",
  "onyx-font-size-lg",
  "onyx-font-size-xl",
];
const lineHeights = [
  "onyx-font-line-height-sm",
  "onyx-font-line-height-md",
  "onyx-font-line-height-lg",
  "onyx-font-line-height-xl",
];
const fontWeights = [
  "onyx-font-weight-regular",
  "onyx-font-weight-semibold",
  "onyx-font-weight-bold",
]
const fontFamilies = [
  "onyx-font-family-data",
  "onyx-font-family-h1",
  "onyx-font-family-h2",
  "onyx-font-family-h3",
  "onyx-font-family-h4",
  "onyx-font-family-mono",
  "onyx-font-family-paragraph",
];
const fontSpacings = ["onyx-font-letter-spacing-default"];

</script>

## Font Size

Defines the relative size of the text.

  <OnyxFontsVariables :variables="fontSizes" type="fontSize" />

## Line Height

Controls the height for lines of text.

  <OnyxFontsVariables :variables="lineHeights" type="lineHeight" />

## Font Weight

Specifies the font weight.

<OnyxFontsVariables :variables="fontWeights" type="fontWeight" />

## Font Families

Specifies the font family.

  <OnyxFontsVariables :variables="fontFamilies" type="fontFamily" />

## Font Spacing

Adjusts the letter spacing of the text.

  <OnyxFontsVariables :variables="fontSpacings" type="fontSpacing" />
