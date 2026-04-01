<script lang="ts" setup>
import { isInternalLink, OnyxLink, type LinkTarget } from "sit-onyx";

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
  <OnyxLink v-bind="props" :target="!isInternalLink(props.href) ? '_blank' : props.target">
    <slot></slot>
  </OnyxLink>
</template>
