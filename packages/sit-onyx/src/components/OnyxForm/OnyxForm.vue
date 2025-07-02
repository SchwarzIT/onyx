<script setup lang="ts">
import { useDensity } from "../../composables/density.js";
import { provideSkeletonContext } from "../../composables/useSkeletonState.js";
import { provideFormContext } from "./OnyxForm.core.js";
import type { OnyxFormProps } from "./types.js";

const props = withDefaults(defineProps<OnyxFormProps>(), {
  disabled: false,
  showError: "touched",
});

defineSlots<{
  /**
   * Any form content
   */
  default?(): unknown;
}>();

provideFormContext(props);
provideSkeletonContext(props);

const { densityClass } = useDensity(props);
</script>

<template>
  <form
    :class="{
      'onyx-component': true,
      'onyx-form': true,
      ...densityClass,
    }"
  >
    <slot></slot>
  </form>
</template>
