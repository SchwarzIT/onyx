<script lang="ts" setup>
import { computed } from "vue";
import ColorStrip from "./ColorStrip.vue";

const props = defineProps<{
  color: "danger" | "warning" | "success" | "info";
}>();

const colors = computed(() => {
  return Array.from(
    { length: 9 },
    (_, index) => `var(--onyx-color-base-${props.color}-${(index + 1) * 100})`,
  );
});
</script>

<template>
  <div class="card">
    <ColorStrip :colors="colors" orientation="horizontal" />
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: var(--onyx-spacing-lg);
  border-radius: var(--onyx-radius-md);
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background: var(--onyx-color-base-background-blank);
  margin: var(--onyx-spacing-md) 0;
}
</style>
