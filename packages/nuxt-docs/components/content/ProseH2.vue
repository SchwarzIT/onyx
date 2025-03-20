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
