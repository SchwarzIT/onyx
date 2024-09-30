<script setup lang="ts">
import { useDensity } from "../../composables/density";
import { provideFormContext } from "./OnyxForm";
import type { OnyxFormProps } from "./types";

const props = defineProps<OnyxFormProps>();

defineSlots<{
  /**
   * Any form content
   */
  default?(): unknown;
}>();

provideFormContext(props);

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
