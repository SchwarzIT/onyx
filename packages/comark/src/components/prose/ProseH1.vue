<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";

const props = defineProps<{
  id?: string;
}>();

defineSlots<{
  default(): unknown;
}>();
</script>

<template>
  <OnyxHeadline is="h1" :hash="props.id">
    <slot />
  </OnyxHeadline>
</template>

<style lang="scss" scoped>
.onyx-headline {
  margin-bottom: var(--onyx-density-lg);
}
</style>
