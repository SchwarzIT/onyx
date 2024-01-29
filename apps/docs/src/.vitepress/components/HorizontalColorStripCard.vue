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
  border: 1px solid var(--onyx-color-base-neutral-300);
  background: var(--onyx-color-base-background-blank);
  margin: var(--onyx-spacing-md) 0;
}
</style>
