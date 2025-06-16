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
const fontTypes = [
  "onyx-font-type-data",
  "onyx-font-type-h1",
  "onyx-font-type-h2",
  "onyx-font-type-h3",
  "onyx-font-type-h4",
  "onyx-font-type-mono",
  "onyx-font-type-paragraph",
];
const fontSpacings = ["onyx-font-letter-spacing-default"];

</script>

## Font Size

Defines the relative size of the text.

  <OnyxFontsVariables :variables="fontSizes" name="fontSize" />

## Line Height

Controls the vertical spacing between lines of text.

  <OnyxFontsVariables :variables="lineHeights" name="lineHeight" />

## Font Types

Specifies the style of the font.

  <OnyxFontsVariables :variables="fontTypes" name="fontType" />

## Font Spacing

Adjusts the letter spacing of the text.

  <OnyxFontsVariables :variables="fontSpacings" name="fontSpacing" />
