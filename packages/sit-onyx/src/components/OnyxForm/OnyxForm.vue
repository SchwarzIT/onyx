<script setup lang="ts">
import { useDensity } from "../../composables/density";
import { provideSkeletonContext } from "../../composables/useSkeletonState";
import { provideFormContext } from "./OnyxForm.core";
import type { OnyxFormProps } from "./types";

const props = withDefaults(defineProps<OnyxFormProps>(), {
  disabled: false,
  showError: "touched",
  showSuccess: false,
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
      'onyx-form': true,
      ...densityClass,
    }"
  >
    <slot></slot>
  </form>
</template>
