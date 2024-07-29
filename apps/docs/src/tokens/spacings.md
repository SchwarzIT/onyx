# Spacings

Below you will find all available spacing tokens that are supported by onyx.

<script lang="ts" setup>
import OnyxSpacingTokens from "../.vitepress/components/OnyxSpacingTokens.vue";
import DensitySelection from "../.vitepress/components/DensitySelection.vue";
import type { Density } from "~components/../composables/density";
import { ref } from "vue";

const selectedDensity = ref<Density>("default");

const densities = [
  "onyx-density-3xs",
  "onyx-density-2xs",
  "onyx-density-xs",
  "onyx-density-sm",
  "onyx-density-md",
  "onyx-density-lg",
  "onyx-density-xl",
  "onyx-density-2xl",
  "onyx-density-3xl",
  "onyx-density-4xl",
];

const spacings = [
  "onyx-spacing-5xs",
  "onyx-spacing-4xs",
  "onyx-spacing-3xs",
  "onyx-spacing-2xs",
  "onyx-spacing-xs",
  "onyx-spacing-sm",
  "onyx-spacing-md",
  "onyx-spacing-lg",
  "onyx-spacing-xl",
  "onyx-spacing-2xl",
  "onyx-spacing-3xl",
  "onyx-spacing-4xl",
];
</script>

## Density aware spacings

The density aware spacing tokens will adjust their value based on the current [density](/basics/density) and should be preferred over fixed spacings in most cases.

<DensitySelection v-model="selectedDensity" style="margin-bottom: var(--onyx-spacing-lg)" />

<!-- the key is needed to update the displayed CSS variable value when the density changes -->
<div :class="`onyx-density-${selectedDensity}`" :key="selectedDensity">
  <OnyxSpacingTokens :variables="densities" />
</div>

## Fixed spacings

The below spacings tokens will apply a fixed spacing, independent on the density.

<OnyxSpacingTokens :variables="spacings" />
