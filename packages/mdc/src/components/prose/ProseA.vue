<script lang="ts" setup>
import { OnyxLink, type LinkTarget } from "sit-onyx";

const props = withDefaults(
  defineProps<{
    href?: string;
    target?: LinkTarget;
  }>(),
  {
    href: "",
  },
);

defineSlots<{
  default(): unknown;
}>();
</script>

<template>
  <OnyxLink v-bind="props">
    <slot></slot>
  </OnyxLink>
</template>
