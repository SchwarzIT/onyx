<script setup lang="ts">
import { toRef } from "vue";
import { useDensity } from "../../composables/density";
import { provideFormContext } from "./OnyxForm.core";
import type { OnyxFormProps } from "./types";

const props = defineProps<OnyxFormProps>();

defineSlots<{
  /**
   * Any form content
   */
  default?(): unknown;
}>();

provideFormContext(toRef(props));

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
