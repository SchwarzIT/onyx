<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
import { defineProps, defineSlots } from "vue";

const props = defineProps<{
  id?: string;
}>();

defineSlots<{
  default(): unknown;
}>();
</script>

<template>
  <OnyxHeadline is="h2" show-as="h1" :hash="props.id">
    <slot />
  </OnyxHeadline>
</template>

<style lang="scss" scoped>
.onyx-headline {
  margin-top: var(--onyx-density-3xl);
  margin-bottom: var(--onyx-density-xs);
}
</style>
