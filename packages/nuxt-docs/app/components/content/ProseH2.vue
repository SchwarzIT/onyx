<script lang="ts" setup>
const props = defineProps<{
  id?: string;
}>();

defineSlots<{
  default(): unknown;
}>();
</script>

<template>
  <OnyxHeadline is="h2" :hash="props.id">
    <slot />
  </OnyxHeadline>
</template>

<style lang="scss" scoped>
.onyx-headline {
  margin-top: var(--onyx-density-2xl);
  margin-bottom: var(--onyx-density-xs);
}
</style>
