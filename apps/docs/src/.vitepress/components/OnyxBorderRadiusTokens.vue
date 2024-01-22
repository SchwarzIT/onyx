<script lang="ts" setup>
import BorderRadiusToken from "./BorderRadiusToken.vue";

const props = defineProps<{
  modelValue?: unknown;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: unknown];
}>();
</script>

<template>
  <div class="tokens">
    <BorderRadiusToken name="onyx-radius-xs" />
    <BorderRadiusToken name="onyx-radius-sm" />
    <BorderRadiusToken name="onyx-radius-md" />
    <BorderRadiusToken name="onyx-radius-lg" />
    <BorderRadiusToken name="onyx-radius-xl" large />
    <BorderRadiusToken name="onyx-radius-full" large />
  </div>
</template>

<style lang="scss" scoped>
.tokens {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-spacing-md);
}
</style>
