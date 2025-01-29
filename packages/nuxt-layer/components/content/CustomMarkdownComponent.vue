<script lang="ts" setup>
const props = defineProps<{
  message: string;
}>();

defineSlots<{
  default?(): unknown;
  otherSlot?(): unknown;
}>();
</script>

<template>
  <div>
    <div>Message: {{ props.message }}</div>
    <slot mdc-unwrap="p" />

    <slot name="otherSlot" mdc-unwrap="p" />
  </div>
</template>
