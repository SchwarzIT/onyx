<script lang="ts" setup>
const props = defineProps<{
  id?: string;
}>();

defineSlots<{
  default(): unknown;
}>();
</script>

<template>
  <OnyxHeadline is="h3" :hash="props.id">
    <slot />
  </OnyxHeadline>
</template>

<style lang="scss" scoped>
.onyx-headline {
  margin-top: var(--onyx-density-lg);
  margin-bottom: var(--onyx-density-2xs);
}
</style>
